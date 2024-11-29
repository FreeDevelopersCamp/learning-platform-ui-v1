import Container from "@/components/Container";
import { PropsWithChildren } from "react";
import NotFoundImage from "./components/NotFoundImage";
import useTranslator from "@/hooks/useTranslator";
import Images from "@/assets/Images";

interface Props {}
const NotFound = ({ children }: PropsWithChildren<Props>) => {
  const { t } = useTranslator();

  return (
    <Container>
      <NotFoundImage
        image={Images.errorStates.notFound404}
        title={t("notFoundPageTitle")}
        description={t("notFoundPageDescription")}
        buttonTitle={t("notFoundPageButtonTitle")}
      />
      {children}
    </Container>
  );
};

export default NotFound;
