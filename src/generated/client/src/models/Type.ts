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
 * @interface Type
 */
export interface Type {
    /**
     * All capabilities used by the post type.
     * @type {object}
     * @memberof Type
     */
    capabilities?: object;
    /**
     * A human-readable description of the post type.
     * @type {string}
     * @memberof Type
     */
    description?: string;
    /**
     * Whether or not the post type should have children.
     * @type {boolean}
     * @memberof Type
     */
    hierarchical?: boolean;
    /**
     * Whether or not the post type can be viewed.
     * @type {boolean}
     * @memberof Type
     */
    viewable?: boolean;
    /**
     * Human-readable labels for the post type for various contexts.
     * @type {object}
     * @memberof Type
     */
    labels?: object;
    /**
     * The title for the post type.
     * @type {string}
     * @memberof Type
     */
    name?: string;
    /**
     * An alphanumeric identifier for the post type.
     * @type {string}
     * @memberof Type
     */
    slug?: string;
    /**
     * All features, supported by the post type.
     * @type {object}
     * @memberof Type
     */
    supports?: object;
    /**
     * Taxonomies associated with post type.
     * @type {Array<string>}
     * @memberof Type
     */
    taxonomies?: Array<string>;
    /**
     * REST base route for the post type.
     * @type {string}
     * @memberof Type
     */
    rest_base?: string;
}

export function TypeFromJSON(json: any): Type {
    return TypeFromJSONTyped(json, false);
}

export function TypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Type {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'capabilities': !exists(json, 'capabilities') ? undefined : json['capabilities'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'hierarchical': !exists(json, 'hierarchical') ? undefined : json['hierarchical'],
        'viewable': !exists(json, 'viewable') ? undefined : json['viewable'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'supports': !exists(json, 'supports') ? undefined : json['supports'],
        'taxonomies': !exists(json, 'taxonomies') ? undefined : json['taxonomies'],
        'rest_base': !exists(json, 'rest_base') ? undefined : json['rest_base'],
    };
}

export function TypeToJSON(value?: Type | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'capabilities': value.capabilities,
        'description': value.description,
        'hierarchical': value.hierarchical,
        'viewable': value.viewable,
        'labels': value.labels,
        'name': value.name,
        'slug': value.slug,
        'supports': value.supports,
        'taxonomies': value.taxonomies,
        'rest_base': value.rest_base,
    };
}


