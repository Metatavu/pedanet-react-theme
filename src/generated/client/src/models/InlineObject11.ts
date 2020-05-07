// tslint:disable
/**
 * localhost:80
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
 * @interface InlineObject11
 */
export interface InlineObject11 {
    /**
     * HTML description of the term.
     * @type {string}
     * @memberof InlineObject11
     */
    description?: string;
    /**
     * HTML title for the term.
     * @type {string}
     * @memberof InlineObject11
     */
    name: string;
    /**
     * An alphanumeric identifier for the term unique to its type.
     * @type {string}
     * @memberof InlineObject11
     */
    slug?: string;
    /**
     * The parent term ID.
     * @type {number}
     * @memberof InlineObject11
     */
    parent?: number;
    /**
     * Meta fields.
     * @type {string}
     * @memberof InlineObject11
     */
    meta?: string;
}

export function InlineObject11FromJSON(json: any): InlineObject11 {
    return InlineObject11FromJSONTyped(json, false);
}

export function InlineObject11FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject11 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'name': json['name'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'parent': !exists(json, 'parent') ? undefined : json['parent'],
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
    };
}

export function InlineObject11ToJSON(value?: InlineObject11 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'name': value.name,
        'slug': value.slug,
        'parent': value.parent,
        'meta': value.meta,
    };
}


