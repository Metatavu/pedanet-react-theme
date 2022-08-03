// tslint:disable
/**
 * localhost
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { exists } from '../runtime';
export function PostTitleFromJSON(json) {
    return PostTitleFromJSONTyped(json, false);
}
export function PostTitleFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'raw': !exists(json, 'raw') ? undefined : json['raw'],
        'rendered': !exists(json, 'rendered') ? undefined : json['rendered'],
    };
}
export function PostTitleToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'raw': value.raw,
        'rendered': value.rendered,
    };
}
//# sourceMappingURL=PostTitle.js.map