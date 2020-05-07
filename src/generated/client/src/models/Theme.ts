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
 * @interface Theme
 */
export interface Theme {
    /**
     * Features supported by this theme.
     * @type {Array<string>}
     * @memberof Theme
     */
    theme_supports?: Array<string>;
}

export function ThemeFromJSON(json: any): Theme {
    return ThemeFromJSONTyped(json, false);
}

export function ThemeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Theme {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'theme_supports': !exists(json, 'theme_supports') ? undefined : json['theme_supports'],
    };
}

export function ThemeToJSON(value?: Theme | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'theme_supports': value.theme_supports,
    };
}


