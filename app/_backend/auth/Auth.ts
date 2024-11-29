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

import { ChangePassword, CreateUserDto, Login, Token } from "./types";
import { ContentType, HttpClient, RequestParams } from "../../http-client";

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authentication
   * @name Register
   * @request POST:/Auth/register
   * @secure
   * @response `default` `Token` Register token
   */
  register = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/register`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name Login
   * @request POST:/Auth/login
   * @secure
   * @response `default` `Token` login token
   */
  login = (data: Login, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name ChangePassword
   * @request POST:/Auth/changePassword
   * @secure
   * @response `default` `Token` Change password token
   */
  changePassword = (data: ChangePassword, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/changePassword`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name KillSession
   * @request POST:/Auth/logout
   * @secure
   * @response `default` `boolean` killSession
   */
  killSession = (params: RequestParams = {}) =>
    this.request<any, boolean>({
      path: `/Auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
}
