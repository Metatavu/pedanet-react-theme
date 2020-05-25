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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineObject9
 */
export interface InlineObject9 {
    /**
     * Unique identifier for the object.
     * @type {number}
     * @memberof InlineObject9
     */
    id?: number;
    /**
     * The date the object was published, in the site\'s timezone.
     * @type {Date}
     * @memberof InlineObject9
     */
    date?: Date;
    /**
     * The date the object was published, as GMT.
     * @type {Date}
     * @memberof InlineObject9
     */
    date_gmt?: Date;
    /**
     * An alphanumeric identifier for the object unique to its type.
     * @type {string}
     * @memberof InlineObject9
     */
    slug?: string;
    /**
     * A named status for the object.
     * @type {string}
     * @memberof InlineObject9
     */
    status?: InlineObject9StatusEnum;
    /**
     * A password to protect access to the content and excerpt.
     * @type {string}
     * @memberof InlineObject9
     */
    password?: string;
    /**
     * The title for the object.
     * @type {string}
     * @memberof InlineObject9
     */
    title?: string;
    /**
     * The content for the object.
     * @type {string}
     * @memberof InlineObject9
     */
    content?: string;
    /**
     * The theme file to use to display the object.
     * @type {string}
     * @memberof InlineObject9
     */
    template?: string;
}

export function InlineObject9FromJSON(json: any): InlineObject9 {
    return InlineObject9FromJSONTyped(json, false);
}

export function InlineObject9FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject9 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'date': !exists(json, 'date') ? undefined : new Date(json['date']),
        'date_gmt': !exists(json, 'date_gmt') ? undefined : new Date(json['date_gmt']),
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'content': !exists(json, 'content') ? undefined : json['content'],
        'template': !exists(json, 'template') ? undefined : json['template'],
    };
}

export function InlineObject9ToJSON(value?: InlineObject9 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'date': value.date == null ? undefined : value.date.toISOString(),
        'date_gmt': value.date_gmt == null ? undefined : value.date_gmt.toISOString(),
        'slug': value.slug,
        'status': value.status,
        'password': value.password,
        'title': value.title,
        'content': value.content,
        'template': value.template,
    };
}

/**
* @export
* @enum {string}
*/
export enum InlineObject9StatusEnum {
    Publish = 'publish',
    Future = 'future',
    Draft = 'draft',
    Pending = 'pending',
    Private = 'private'
}


