import { DefaultApi, Configuration } from "../generated/client/src";
var path = window.location;
var API_BASE_PATH = path.protocol + "//" + path.hostname + ":" + path.port + "/wp-json";
/**
 * Utility class for loading api with predefined configuration
 */
var ApiUtils = /** @class */ (function () {
    function ApiUtils() {
    }
    ApiUtils.getApi = function () {
        return new DefaultApi(new Configuration({ basePath: API_BASE_PATH }));
    };
    return ApiUtils;
}());
export default ApiUtils;
//# sourceMappingURL=ApiUtils.js.map