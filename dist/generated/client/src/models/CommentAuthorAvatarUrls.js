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
export function CommentAuthorAvatarUrlsFromJSON(json) {
    return CommentAuthorAvatarUrlsFromJSONTyped(json, false);
}
export function CommentAuthorAvatarUrlsFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        '_24': !exists(json, '24') ? undefined : json['24'],
        '_48': !exists(json, '48') ? undefined : json['48'],
        '_96': !exists(json, '96') ? undefined : json['96'],
    };
}
export function CommentAuthorAvatarUrlsToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        '24': value._24,
        '48': value._48,
        '96': value._96,
    };
}
//# sourceMappingURL=CommentAuthorAvatarUrls.js.map