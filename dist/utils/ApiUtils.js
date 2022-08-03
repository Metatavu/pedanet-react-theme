import { DefaultApi, Configuration } from "../generated/client/src";
var path = window.location;
var API_BASE_PATH = "".concat(path.protocol, "//").concat(path.hostname, ":").concat(path.port, "/wp-json");
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