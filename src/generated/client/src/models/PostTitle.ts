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
 * The title for the object.
 * @export
 * @interface PostTitle
 */
export interface PostTitle {
    /**
     * Title for the object, as it exists in the database.
     * @type {string}
     * @memberof PostTitle
     */
    raw?: string;
    /**
     * HTML title for the object, transformed for display.
     * @type {string}
     * @memberof PostTitle
     */
    rendered?: string;
}

export function PostTitleFromJSON(json: any): PostTitle {
    return PostTitleFromJSONTyped(json, false);
}

export function PostTitleFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostTitle {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'raw': !exists(json, 'raw') ? undefined : json['raw'],
        'rendered': !exists(json, 'rendered') ? undefined : json['rendered'],
    };
}

export function PostTitleToJSON(value?: PostTitle | null): any {
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


