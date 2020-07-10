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
import {
    CommentAuthorAvatarUrls,
    CommentAuthorAvatarUrlsFromJSON,
    CommentAuthorAvatarUrlsFromJSONTyped,
    CommentAuthorAvatarUrlsToJSON,
    CommentContent,
    CommentContentFromJSON,
    CommentContentFromJSONTyped,
    CommentContentToJSON,
} from './';

/**
 * 
 * @export
 * @interface Comment
 */
export interface Comment {
    /**
     * Unique identifier for the object.
     * @type {number}
     * @memberof Comment
     */
    id?: number;
    /**
     * The ID of the user object, if author was a user.
     * @type {number}
     * @memberof Comment
     */
    author?: number;
    /**
     * Email address for the object author.
     * @type {string}
     * @memberof Comment
     */
    author_email?: string;
    /**
     * IP address for the object author.
     * @type {string}
     * @memberof Comment
     */
    author_ip?: string;
    /**
     * Display name for the object author.
     * @type {string}
     * @memberof Comment
     */
    author_name?: string;
    /**
     * URL for the object author.
     * @type {string}
     * @memberof Comment
     */
    author_url?: string;
    /**
     * User agent for the object author.
     * @type {string}
     * @memberof Comment
     */
    author_user_agent?: string;
    /**
     * 
     * @type {CommentContent}
     * @memberof Comment
     */
    content?: CommentContent;
    /**
     * The date the object was published, in the site\'s timezone.
     * @type {Date}
     * @memberof Comment
     */
    date?: Date;
    /**
     * The date the object was published, as GMT.
     * @type {Date}
     * @memberof Comment
     */
    date_gmt?: Date;
    /**
     * URL to the object.
     * @type {string}
     * @memberof Comment
     */
    link?: string;
    /**
     * The ID for the parent of the object.
     * @type {number}
     * @memberof Comment
     */
    parent?: number;
    /**
     * The ID of the associated post object.
     * @type {number}
     * @memberof Comment
     */
    post?: number;
    /**
     * State of the object.
     * @type {string}
     * @memberof Comment
     */
    status?: string;
    /**
     * Type of Comment for the object.
     * @type {string}
     * @memberof Comment
     */
    type?: string;
    /**
     * 
     * @type {CommentAuthorAvatarUrls}
     * @memberof Comment
     */
    author_avatar_urls?: CommentAuthorAvatarUrls;
    /**
     * Meta fields.
     * @type {object}
     * @memberof Comment
     */
    meta?: object;
}

export function CommentFromJSON(json: any): Comment {
    return CommentFromJSONTyped(json, false);
}

export function CommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Comment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'author': !exists(json, 'author') ? undefined : json['author'],
        'author_email': !exists(json, 'author_email') ? undefined : json['author_email'],
        'author_ip': !exists(json, 'author_ip') ? undefined : json['author_ip'],
        'author_name': !exists(json, 'author_name') ? undefined : json['author_name'],
        'author_url': !exists(json, 'author_url') ? undefined : json['author_url'],
        'author_user_agent': !exists(json, 'author_user_agent') ? undefined : json['author_user_agent'],
        'content': !exists(json, 'content') ? undefined : CommentContentFromJSON(json['content']),
        'date': !exists(json, 'date') ? undefined : new Date(json['date']),
        'date_gmt': !exists(json, 'date_gmt') ? undefined : new Date(json['date_gmt']),
        'link': !exists(json, 'link') ? undefined : json['link'],
        'parent': !exists(json, 'parent') ? undefined : json['parent'],
        'post': !exists(json, 'post') ? undefined : json['post'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'author_avatar_urls': !exists(json, 'author_avatar_urls') ? undefined : CommentAuthorAvatarUrlsFromJSON(json['author_avatar_urls']),
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
    };
}

export function CommentToJSON(value?: Comment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'author': value.author,
        'author_email': value.author_email,
        'author_ip': value.author_ip,
        'author_name': value.author_name,
        'author_url': value.author_url,
        'author_user_agent': value.author_user_agent,
        'content': CommentContentToJSON(value.content),
        'date': value.date == null ? undefined : value.date.toISOString(),
        'date_gmt': value.date_gmt == null ? undefined : value.date_gmt.toISOString(),
        'link': value.link,
        'parent': value.parent,
        'post': value.post,
        'status': value.status,
        'type': value.type,
        'author_avatar_urls': CommentAuthorAvatarUrlsToJSON(value.author_avatar_urls),
        'meta': value.meta,
    };
}


