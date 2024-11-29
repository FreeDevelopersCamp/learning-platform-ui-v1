import * as fs from "node:fs";
import * as path from "path";
import { program } from "commander";
import { generateApi } from "swagger-typescript-api";
import { get } from "http";
import dotenv from "dotenv";

const generate = async () => {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
  });

  program
    .name("yarn api:generator")
    .description("Script to automaticaly generate type safe swagger APIs")
    .version("1.0.0")
    .argument("<module_name>", "Module Name")
    .argument("<controller>", "Controller Name")
    .parse(process.argv);

  const [module, controller] = program.args;
  const capitalizedController = capitalize(controller);
  const jsonPath = `${process.env.REACT_APP_API_HOST}/api/v1/app/${module}-json`;

  logYellowColor("Downloading Swagger File ...", jsonPath);

  const formattedJsonSwagger = await downloadSwaggerFile(jsonPath);
  const modifiedSwagger = getControllerApis(formattedJsonSwagger, controller);

  if (!Object.values(modifiedSwagger.paths).length) {
    console.log(
      `/${controller}/**`,
      "was not found in the swagger paths. Please make sure this is the correct path and correct Swagger file."
    );
    process.exit(1);
  }

  const outputPath = path.resolve(
    process.cwd(),
    `./src/apis/${module}/${capitalizedController}`
  );

  console.log("Generating API Client ...", capitalizedController);

  const generatedFiles = await generateApi({
    name: `${capitalizedController}.ts`,
    output: outputPath,
    spec: modifiedSwagger,
    httpClientType: "axios",
    generateClient: true,
    generateResponses: true,
    extractRequestParams: true,
    extractRequestBody: true,
    extractEnums: true,
    modular: true,
    silent: true,
    hooks: {
      onFormatRouteName: handleFormatRouteName,
    },
  });

  removeFiles([
    path.resolve(
      process.cwd(),
      `./src/apis/${module}/${capitalizedController}/http-client.ts`
    ),
  ]);

  const typesFilePath = path.resolve(
    process.cwd(),
    `./src/apis/${module}/${capitalizedController}/data-contracts.ts`
  );

  const hasTypesFile = fs.existsSync(typesFilePath);

  renameFile(
    typesFilePath,
    path.resolve(
      process.cwd(),
      `./src/apis/${module}/${capitalizedController}/types.ts`
    )
  );

  generatedFiles.files = updateClientImports(generatedFiles.files);

  createIndexFile({ module, controller });

  createGeneratedFiles({
    generatedFiles,
    controller,
    module,
    outputPath,
  });

  if (hasTypesFile) {
    logWithCheckAndGreenColor(
      path.resolve(
        process.cwd(),
        `./src/apis/${module}/${capitalize(capitalizedController)}/types.ts`
      )
    );
  }

  console.log("---------------------------------------");
  console.log("\x1b[32m%s\x1b[0m", "Ready!");
  console.log("To begin using the API, import the client as:");
  console.log("\x1b[36m%s\x1b[0m", "```");
  console.log(
    "\x1b[36m%s\x1b[0m",
    `  import ${capitalizedController}Client from "@/apis/${module}/${capitalizedController}";`
  );
  console.log("\x1b[36m%s\x1b[0m", "```");
  // -------------------------------- USED FUNCTIONS ----------------------------------------

  function downloadSwaggerFile(path) {
    return new Promise((resolve) => {
      get(path, function (response) {
        let responseData = "";
        response
          .on("data", (data) => {
            responseData += data;
          })
          .on("error", console.error)
          .on("end", () => {
            resolve(JSON.parse(responseData));
          });
      });
    });
  }

  function handleFormatTypeName(controllerName) {
    return function (_typeName, rawTypeName) {
      const routeTypeName = rawTypeName.includes("`")
        ? parseGeneralTypeName(rawTypeName)
        : parseSpecificTypeName(rawTypeName);
      return (
        routeTypeName + (routeTypeName === controllerName ? "Interface" : "")
      );
    };
  }

  function parseGeneralTypeName(rawTypeName) {
    let [rawTypeName1, rawTypeName2] = rawTypeName.replace("+", "").split("`");
    rawTypeName1 = rawTypeName1.split(".");
    rawTypeName1 = rawTypeName1[rawTypeName1.length - 1];
    rawTypeName2 = rawTypeName2 || "";
    rawTypeName2 = rawTypeName2.split(",")[0].split(".");
    rawTypeName2 = rawTypeName2[rawTypeName2.length - 1];

    return rawTypeName2 + rawTypeName1;
  }

  function parseSpecificTypeName(rawTypeName) {
    const [rawType] = rawTypeName.replace("+", "").split(",");
    const rawTypeModelNames = rawType.trim().split(".");
    return rawTypeModelNames[rawTypeModelNames.length - 1];
  }

  function handleFormatRouteName(routeInfo, templateRouteName) {
    let cleanRouteName = templateRouteName
      .replace(`${camelCase(controller)}Controller`, "")
      .replace(`${controller}Controller`, "");

    const isRequestGetMultiple = !!routeInfo.responsesTypes.find((res) =>
      res.type.endsWith("RetrieveMultipleResponse")
    );
    if (isRequestGetMultiple && routeInfo.method === "get") {
      cleanRouteName = cleanRouteName.replace(/Details?$/, "List");
    }

    const routeArgs =
      routeInfo.pathArgs.length > 0
        ? "By" + routeInfo.pathArgs.map((p) => pascalCase(p.name)).join("And")
        : "";

    return camelCase(cleanRouteName);
  }

  function createIndexFile({ module, controller }) {
    const indexFilePath = path.resolve(
      process.cwd(),
      `./src/apis/${module}/${capitalizedController}/index.ts`
    );
    if (!fs.existsSync(indexFilePath)) {
      const indexFileContent = `
        /**
        * PLEASE DO NOT EDIT THESE GENERATED FILES
        */
        import { ${capitalizedController} } from "./${capitalizedController}";

        const ${controller}Client = new ${capitalizedController}();

        export default ${controller}Client;
        `;

      fs.writeFileSync(indexFilePath, indexFileContent);
      logWithCheckAndGreenColor(indexFilePath);
    }
  }

  function updateClientImports(files) {
    return files
      .filter(
        (file) => !["data-contracts", "http-client"].includes(file.fileName)
      )
      .map((file) => ({
        ...file,
        content: file.fileContent
          ?.replace("./http-client", "../../http-client")
          ?.replace("./data-contracts", "./types"),
      }));
  }

  function removeFiles(files) {
    files.forEach((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.error("Failed to delete", file);
          console.log("Please remove it manually");
          console.error(err);
        }
      });
    });
  }

  function renameFile(oldPath, newPath) {
    if (fs.existsSync(oldPath)) {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.warn(`Failed to rename ${oldPath}.`);
          console.error(`Please remove it manually to ${newPath}`);
          console.error(err);
        }
      });
    }
  }

  function pascalCase(text) {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  function capitalize(text) {
    return text.replace(/^\w/, (c) => c.toUpperCase());
  }

  function getControllerApis(swagger, path) {
    const swaggerPaths = Object.keys(swagger.paths).filter(
      (p) => p === `/api/v1/${path}` || p.startsWith(`/api/v1/${path}/`)
    );
    swagger.paths = swaggerPaths.reduce(
      (obj, path) =>
        Object.assign(obj, {
          [path.replace("/api/v1", "")]: swagger.paths[path],
        }),
      {}
    );

    const minifiedDefinitions = {};
    let definitionsStack = getNestedRefsValues(swagger.paths);

    const isDefinitionsFound = (d) =>
      minifiedDefinitions[d] || definitionsStack.includes(d);

    while (definitionsStack.length > 0) {
      const d = definitionsStack.shift();
      if (minifiedDefinitions[d]) {
        continue;
      }
      minifiedDefinitions[d] = swagger.components.schemas[d];
      const newDefinitions = getNestedRefsValues(
        swagger.components.schemas[d]
      ).filter((d) => !isDefinitionsFound(d));
      definitionsStack = definitionsStack.concat(newDefinitions);
    }

    swagger.components = { schemas: minifiedDefinitions };
    swagger.host = "";
    swagger.basePath = "/app";

    return swagger;
  }

  function getNestedRefsValues(obj, key = "$ref") {
    if (typeof obj !== "object") return [];

    const keyValue = obj?.[key];

    if (typeof keyValue === "string") {
      const value = keyValue.replace("#/components/schemas/", "");
      return [value];
    }

    if (Array.isArray(obj)) {
      return obj
        .map((x) => getNestedRefsValues(x))
        .reduce((arr, x) => arr.concat(x), []);
    }

    return Object.values(obj || {})
      .map((x) => getNestedRefsValues(x))
      .reduce((arr, x) => arr.concat(x), []);
  }

  function createGeneratedFiles({ generatedFiles, outputPath }) {
    generatedFiles.files.forEach((file) => {
      const fileName = `${file.fileName}.ts`;

      logWithCheckAndGreenColor(
        path.resolve(
          process.cwd(),
          `./src/apis/${module}/${capitalizedController}/${fileName}`
        )
      );

      generatedFiles.createFile({
        fileName,
        content: file.content,
        path: outputPath,
        withPrefix: true,
      });
    });
  }

  function camelCase(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
  }

  function logWithCheckAndGreenColor(message) {
    console.log("\x1b[32m%s\x1b[0m", "✅" + message);
  }

  function logYellowColor(...message) {
    console.log("\x1b[33m%s\x1b[0m", ...message);
  }
};
generate();
