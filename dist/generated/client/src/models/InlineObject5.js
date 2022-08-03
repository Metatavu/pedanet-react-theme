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
export function InlineObject5FromJSON(json) {
    return InlineObject5FromJSONTyped(json, false);
}
export function InlineObject5FromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'parent': !exists(json, 'parent') ? undefined : json['parent'],
        'date': !exists(json, 'date') ? undefined : new Date(json['date']),
        'date_gmt': !exists(json, 'date_gmt') ? undefined : new Date(json['date_gmt']),
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'content': !exists(json, 'content') ? undefined : json['content'],
        'author': !exists(json, 'author') ? undefined : json['author'],
        'excerpt': !exists(json, 'excerpt') ? undefined : json['excerpt'],
        'featured_media': !exists(json, 'featured_media') ? undefined : json['featured_media'],
        'comment_status': !exists(json, 'comment_status') ? undefined : json['comment_status'],
        'ping_status': !exists(json, 'ping_status') ? undefined : json['ping_status'],
        'menu_order': !exists(json, 'menu_order') ? undefined : json['menu_order'],
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'template': !exists(json, 'template') ? undefined : json['template'],
    };
}
export function InlineObject5ToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'parent': value.parent,
        'date': value.date == null ? undefined : value.date.toISOString(),
        'date_gmt': value.date_gmt == null ? undefined : value.date_gmt.toISOString(),
        'slug': value.slug,
        'status': value.status,
        'password': value.password,
        'title': value.title,
        'content': value.content,
        'author': value.author,
        'excerpt': value.excerpt,
        'featured_media': value.featured_media,
        'comment_status': value.comment_status,
        'ping_status': value.ping_status,
        'menu_order': value.menu_order,
        'meta': value.meta,
        'template': value.template,
    };
}
/**
* @export
* @enum {string}
*/
export var InlineObject5StatusEnum;
(function (InlineObject5StatusEnum) {
    InlineObject5StatusEnum["Publish"] = "publish";
    InlineObject5StatusEnum["Future"] = "future";
    InlineObject5StatusEnum["Draft"] = "draft";
    InlineObject5StatusEnum["Pending"] = "pending";
    InlineObject5StatusEnum["Private"] = "private";
})(InlineObject5StatusEnum || (InlineObject5StatusEnum = {}));
/**
* @export
* @enum {string}
*/
export var InlineObject5CommentStatusEnum;
(function (InlineObject5CommentStatusEnum) {
    InlineObject5CommentStatusEnum["Open"] = "open";
    InlineObject5CommentStatusEnum["Closed"] = "closed";
})(InlineObject5CommentStatusEnum || (InlineObject5CommentStatusEnum = {}));
/**
* @export
* @enum {string}
*/
export var InlineObject5PingStatusEnum;
(function (InlineObject5PingStatusEnum) {
    InlineObject5PingStatusEnum["Open"] = "open";
    InlineObject5PingStatusEnum["Closed"] = "closed";
})(InlineObject5PingStatusEnum || (InlineObject5PingStatusEnum = {}));
//# sourceMappingURL=InlineObject5.js.map