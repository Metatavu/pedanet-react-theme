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
 * The visibility settings for the taxonomy.
 * @export
 * @interface TaxonomyVisibility
 */
export interface TaxonomyVisibility {
    /**
     * Whether a taxonomy is intended for use publicly either via the admin interface or by front-end users.
     * @type {boolean}
     * @memberof TaxonomyVisibility
     */
    _public?: boolean;
    /**
     * Whether the taxonomy is publicly queryable.
     * @type {boolean}
     * @memberof TaxonomyVisibility
     */
    publicly_queryable?: boolean;
    /**
     * Whether to generate a default UI for managing this taxonomy.
     * @type {boolean}
     * @memberof TaxonomyVisibility
     */
    show_ui?: boolean;
    /**
     * Whether to allow automatic creation of taxonomy columns on associated post-types table.
     * @type {boolean}
     * @memberof TaxonomyVisibility
     */
    show_admin_column?: boolean;
    /**
     * Whether to make the taxonomy available for selection in navigation menus.
     * @type {boolean}
     * @memberof TaxonomyVisibility
     */
    show_in_nav_menus?: boolean;
    /**
     * Whether to show the taxonomy in the quick/bulk edit panel.
     * @type {boolean}
     * @memberof TaxonomyVisibility
     */
    show_in_quick_edit?: boolean;
}

export function TaxonomyVisibilityFromJSON(json: any): TaxonomyVisibility {
    return TaxonomyVisibilityFromJSONTyped(json, false);
}

export function TaxonomyVisibilityFromJSONTyped(json: any, ignoreDiscriminator: boolean): TaxonomyVisibility {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_public': !exists(json, 'public') ? undefined : json['public'],
        'publicly_queryable': !exists(json, 'publicly_queryable') ? undefined : json['publicly_queryable'],
        'show_ui': !exists(json, 'show_ui') ? undefined : json['show_ui'],
        'show_admin_column': !exists(json, 'show_admin_column') ? undefined : json['show_admin_column'],
        'show_in_nav_menus': !exists(json, 'show_in_nav_menus') ? undefined : json['show_in_nav_menus'],
        'show_in_quick_edit': !exists(json, 'show_in_quick_edit') ? undefined : json['show_in_quick_edit'],
    };
}

export function TaxonomyVisibilityToJSON(value?: TaxonomyVisibility | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'public': value._public,
        'publicly_queryable': value.publicly_queryable,
        'show_ui': value.show_ui,
        'show_admin_column': value.show_admin_column,
        'show_in_nav_menus': value.show_in_nav_menus,
        'show_in_quick_edit': value.show_in_quick_edit,
    };
}


