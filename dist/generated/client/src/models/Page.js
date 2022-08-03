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
import { PostContentFromJSON, PostContentToJSON, PostExcerptFromJSON, PostExcerptToJSON, PostGuidFromJSON, PostGuidToJSON, PostTitleFromJSON, PostTitleToJSON, } from './';
export function PageFromJSON(json) {
    return PageFromJSONTyped(json, false);
}
export function PageFromJSONTyped(json, ignoreDiscriminator) {
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
        'permalink_template': !exists(json, 'permalink_template') ? undefined : json['permalink_template'],
        'generated_slug': !exists(json, 'generated_slug') ? undefined : json['generated_slug'],
        'parent': !exists(json, 'parent') ? undefined : json['parent'],
        'title': !exists(json, 'title') ? undefined : PostTitleFromJSON(json['title']),
        'content': !exists(json, 'content') ? undefined : PostContentFromJSON(json['content']),
        'author': !exists(json, 'author') ? undefined : json['author'],
        'excerpt': !exists(json, 'excerpt') ? undefined : PostExcerptFromJSON(json['excerpt']),
        'featured_media': !exists(json, 'featured_media') ? undefined : json['featured_media'],
        'comment_status': !exists(json, 'comment_status') ? undefined : json['comment_status'],
        'ping_status': !exists(json, 'ping_status') ? undefined : json['ping_status'],
        'menu_order': !exists(json, 'menu_order') ? undefined : json['menu_order'],
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'categories': !exists(json, 'categories') ? undefined : json['categories'],
        'template': !exists(json, 'template') ? undefined : json['template'],
        'taxonomy_academy': !exists(json, 'taxonomy/academy') ? undefined : json['taxonomy/academy'],
    };
}
export function PageToJSON(value) {
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
        'permalink_template': value.permalink_template,
        'generated_slug': value.generated_slug,
        'parent': value.parent,
        'title': PostTitleToJSON(value.title),
        'content': PostContentToJSON(value.content),
        'author': value.author,
        'excerpt': PostExcerptToJSON(value.excerpt),
        'featured_media': value.featured_media,
        'comment_status': value.comment_status,
        'ping_status': value.ping_status,
        'menu_order': value.menu_order,
        'meta': value.meta,
        'categories': value.categories,
        'template': value.template,
        'taxonomy/academy': value.taxonomy_academy,
    };
}
/**
* @export
* @enum {string}
*/
export var PageStatusEnum;
(function (PageStatusEnum) {
    PageStatusEnum["Publish"] = "publish";
    PageStatusEnum["Future"] = "future";
    PageStatusEnum["Draft"] = "draft";
    PageStatusEnum["Pending"] = "pending";
    PageStatusEnum["Private"] = "private";
})(PageStatusEnum || (PageStatusEnum = {}));
/**
* @export
* @enum {string}
*/
export var PageCommentStatusEnum;
(function (PageCommentStatusEnum) {
    PageCommentStatusEnum["Open"] = "open";
    PageCommentStatusEnum["Closed"] = "closed";
})(PageCommentStatusEnum || (PageCommentStatusEnum = {}));
/**
* @export
* @enum {string}
*/
export var PagePingStatusEnum;
(function (PagePingStatusEnum) {
    PagePingStatusEnum["Open"] = "open";
    PagePingStatusEnum["Closed"] = "closed";
})(PagePingStatusEnum || (PagePingStatusEnum = {}));
//# sourceMappingURL=Page.js.map