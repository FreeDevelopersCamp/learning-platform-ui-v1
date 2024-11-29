/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ResourceImageDto } from "./types";
import { ContentType, HttpClient, RequestParams } from "../../http-client";

export class Image<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name UploadFile
   * @request POST:/image/upload
   * @response `default` `ResourceImageDto` Upload file
   */
  uploadFile = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, ResourceImageDto>({
      path: `/image/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @name ServeImage
   * @request GET:/image/{filename}
   * @response `200` `void`
   */
  serveImage = (filename: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/image/${filename}`,
      method: "GET",
      ...params,
    });
}
