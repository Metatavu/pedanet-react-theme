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
import { PostGuidFromJSON, PostGuidToJSON, WpBlockContentFromJSON, WpBlockContentToJSON, WpBlockTitleFromJSON, WpBlockTitleToJSON, } from './';
export function WpBlockFromJSON(json) {
    return WpBlockFromJSONTyped(json, false);
}
export function WpBlockFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'date': !exists(json, 'date') ? undefined : new Date(json['date']),
        'date_gmt': !exists(json, 'date_gmt') ? undefined : new Date(json['date_gmt']),
        'guid': !exists(json, 'guid') ? undefined : PostGuidFromJSON(json['guid']),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'link': !exists(json, 'link') ? undefined : json['link'],
        'modified': !exists(json, 'modified') ? undefined : new Date(json['modified']),
        'modified_gmt': !exists(json, 'modified_gmt') ? undefined : new Date(json['modified_gmt']),
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'title': !exists(json, 'title') ? undefined : WpBlockTitleFromJSON(json['title']),
        'content': !exists(json, 'content') ? undefined : WpBlockContentFromJSON(json['content']),
        'template': !exists(json, 'template') ? undefined : json['template'],
    };
}
export function WpBlockToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'date': value.date == null ? undefined : value.date.toISOString(),
        'date_gmt': value.date_gmt == null ? undefined : value.date_gmt.toISOString(),
        'guid': PostGuidToJSON(value.guid),
        'id': value.id,
        'link': value.link,
        'modified': value.modified == null ? undefined : value.modified.toISOString(),
        'modified_gmt': value.modified_gmt == null ? undefined : value.modified_gmt.toISOString(),
        'slug': value.slug,
        'status': value.status,
        'type': value.type,
        'password': value.password,
        'title': WpBlockTitleToJSON(value.title),
        'content': WpBlockContentToJSON(value.content),
        'template': value.template,
    };
}
/**
* @export
* @enum {string}
*/
export var WpBlockStatusEnum;
(function (WpBlockStatusEnum) {
    WpBlockStatusEnum["Publish"] = "publish";
    WpBlockStatusEnum["Future"] = "future";
    WpBlockStatusEnum["Draft"] = "draft";
    WpBlockStatusEnum["Pending"] = "pending";
    WpBlockStatusEnum["Private"] = "private";
})(WpBlockStatusEnum || (WpBlockStatusEnum = {}));
//# sourceMappingURL=WpBlock.js.map