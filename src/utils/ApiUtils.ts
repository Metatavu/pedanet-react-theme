import { DefaultApi, Configuration } from "../generated/client/src";

const path = window.location;

const API_BASE_PATH = `${path.protocol}//${path.hostname}:${path.port}/wp-json`;

/**
 * Utility class for loading api with predefined configuration
 */
export default class ApiUtils {

  public static getApi() {
    return new DefaultApi(new Configuration({basePath: API_BASE_PATH}));
  }

}