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
export function MenuItemDataFromJSON(json) {
    return MenuItemDataFromJSONTyped(json, false);
}
export function MenuItemDataFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'post_author': !exists(json, 'post_author') ? undefined : json['post_author'],
        'post_date': !exists(json, 'post_date') ? undefined : json['post_date'],
        'post_date_gmt': !exists(json, 'post_date_gmt') ? undefined : json['post_date_gmt'],
        'post_content': !exists(json, 'post_content') ? undefined : json['post_content'],
        'post_title': !exists(json, 'post_title') ? undefined : json['post_title'],
        'post_excerpt': !exists(json, 'post_excerpt') ? undefined : json['post_excerpt'],
        'post_status': !exists(json, 'post_status') ? undefined : json['post_status'],
        'comment_status': !exists(json, 'comment_status') ? undefined : json['comment_status'],
        'ping_status': !exists(json, 'ping_status') ? undefined : json['ping_status'],
        'post_password': !exists(json, 'post_password') ? undefined : json['post_password'],
        'post_name': !exists(json, 'post_name') ? undefined : json['post_name'],
        'to_ping': !exists(json, 'to_ping') ? undefined : json['to_ping'],
        'post_modified': !exists(json, 'post_modified') ? undefined : json['post_modified'],
        'post_modified_gmt': !exists(json, 'post_modified_gmt') ? undefined : json['post_modified_gmt'],
        'post_content_filtered': !exists(json, 'post_content_filtered') ? undefined : json['post_content_filtered'],
        'post_parent': !exists(json, 'post_parent') ? undefined : json['post_parent'],
        'guid': !exists(json, 'guid') ? undefined : json['guid'],
        'menu_order': !exists(json, 'menu_order') ? undefined : json['menu_order'],
        'post_type': !exists(json, 'post_type') ? undefined : json['post_type'],
        'post_mime_type': !exists(json, 'post_mime_type') ? undefined : json['post_mime_type'],
        'comment_count': !exists(json, 'comment_count') ? undefined : json['comment_count'],
        'filter': !exists(json, 'filter') ? undefined : json['filter'],
        'db_id': !exists(json, 'db_id') ? undefined : json['db_id'],
        'menu_item_parent': !exists(json, 'menu_item_parent') ? undefined : json['menu_item_parent'],
        'object_id': !exists(json, 'object_id') ? undefined : json['object_id'],
        'object': !exists(json, 'object') ? undefined : json['object'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'type_label': !exists(json, 'type_label') ? undefined : json['type_label'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'target': !exists(json, 'target') ? undefined : json['target'],
        'attr_title': !exists(json, 'attr_title') ? undefined : json['attr_title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'xfn': !exists(json, 'xfn') ? undefined : json['xfn'],
        'classes': !exists(json, 'classes') ? undefined : json['classes'],
        'child_items': !exists(json, 'child_items') ? undefined : json['child_items'].map(MenuItemDataFromJSON),
    };
}
export function MenuItemDataToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'post_author': value.post_author,
        'post_date': value.post_date,
        'post_date_gmt': value.post_date_gmt,
        'post_content': value.post_content,
        'post_title': value.post_title,
        'post_excerpt': value.post_excerpt,
        'post_status': value.post_status,
        'comment_status': value.comment_status,
        'ping_status': value.ping_status,
        'post_password': value.post_password,
        'post_name': value.post_name,
        'to_ping': value.to_ping,
        'post_modified': value.post_modified,
        'post_modified_gmt': value.post_modified_gmt,
        'post_content_filtered': value.post_content_filtered,
        'post_parent': value.post_parent,
        'guid': value.guid,
        'menu_order': value.menu_order,
        'post_type': value.post_type,
        'post_mime_type': value.post_mime_type,
        'comment_count': value.comment_count,
        'filter': value.filter,
        'db_id': value.db_id,
        'menu_item_parent': value.menu_item_parent,
        'object_id': value.object_id,
        'object': value.object,
        'type': value.type,
        'type_label': value.type_label,
        'title': value.title,
        'url': value.url,
        'target': value.target,
        'attr_title': value.attr_title,
        'description': value.description,
        'xfn': value.xfn,
        'classes': value.classes,
        'child_items': value.child_items == null ? undefined : value.child_items.map(MenuItemDataToJSON),
    };
}
//# sourceMappingURL=MenuItemData.js.map