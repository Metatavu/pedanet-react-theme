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
    AttachmentCaption,
    AttachmentCaptionFromJSON,
    AttachmentCaptionFromJSONTyped,
    AttachmentCaptionToJSON,
    AttachmentDescription,
    AttachmentDescriptionFromJSON,
    AttachmentDescriptionFromJSONTyped,
    AttachmentDescriptionToJSON,
    PostGuid,
    PostGuidFromJSON,
    PostGuidFromJSONTyped,
    PostGuidToJSON,
    PostTitle,
    PostTitleFromJSON,
    PostTitleFromJSONTyped,
    PostTitleToJSON,
} from './';

/**
 * 
 * @export
 * @interface Attachment
 */
export interface Attachment {
    /**
     * The date the object was published, in the site\'s timezone.
     * @type {Date}
     * @memberof Attachment
     */
    date?: Date;
    /**
     * The date the object was published, as GMT.
     * @type {Date}
     * @memberof Attachment
     */
    date_gmt?: Date;
    /**
     * 
     * @type {PostGuid}
     * @memberof Attachment
     */
    guid?: PostGuid;
    /**
     * Unique identifier for the object.
     * @type {number}
     * @memberof Attachment
     */
    id?: number;
    /**
     * URL to the object.
     * @type {string}
     * @memberof Attachment
     */
    link?: string;
    /**
     * The date the object was last modified, in the site\'s timezone.
     * @type {Date}
     * @memberof Attachment
     */
    modified?: Date;
    /**
     * The date the object was last modified, as GMT.
     * @type {Date}
     * @memberof Attachment
     */
    modified_gmt?: Date;
    /**
     * An alphanumeric identifier for the object unique to its type.
     * @type {string}
     * @memberof Attachment
     */
    slug?: string;
    /**
     * A named status for the object.
     * @type {string}
     * @memberof Attachment
     */
    status?: AttachmentStatusEnum;
    /**
     * Type of Post for the object.
     * @type {string}
     * @memberof Attachment
     */
    type?: string;
    /**
     * Permalink template for the object.
     * @type {string}
     * @memberof Attachment
     */
    permalink_template?: string;
    /**
     * Slug automatically generated from the object title.
     * @type {string}
     * @memberof Attachment
     */
    generated_slug?: string;
    /**
     * 
     * @type {PostTitle}
     * @memberof Attachment
     */
    title?: PostTitle;
    /**
     * The ID for the author of the object.
     * @type {number}
     * @memberof Attachment
     */
    author?: number;
    /**
     * Whether or not comments are open on the object.
     * @type {string}
     * @memberof Attachment
     */
    comment_status?: AttachmentCommentStatusEnum;
    /**
     * Whether or not the object can be pinged.
     * @type {string}
     * @memberof Attachment
     */
    ping_status?: AttachmentPingStatusEnum;
    /**
     * Meta fields.
     * @type {object}
     * @memberof Attachment
     */
    meta?: object;
    /**
     * The theme file to use to display the object.
     * @type {string}
     * @memberof Attachment
     */
    template?: string;
    /**
     * Alternative text to display when attachment is not displayed.
     * @type {string}
     * @memberof Attachment
     */
    alt_text?: string;
    /**
     * 
     * @type {AttachmentCaption}
     * @memberof Attachment
     */
    caption?: AttachmentCaption;
    /**
     * 
     * @type {AttachmentDescription}
     * @memberof Attachment
     */
    description?: AttachmentDescription;
    /**
     * Attachment type.
     * @type {string}
     * @memberof Attachment
     */
    media_type?: AttachmentMediaTypeEnum;
    /**
     * The attachment MIME type.
     * @type {string}
     * @memberof Attachment
     */
    mime_type?: string;
    /**
     * Details about the media file, specific to its type.
     * @type {object}
     * @memberof Attachment
     */
    media_details?: object;
    /**
     * The ID for the associated post of the attachment.
     * @type {number}
     * @memberof Attachment
     */
    post?: number;
    /**
     * URL to the original attachment file.
     * @type {string}
     * @memberof Attachment
     */
    source_url?: string;
}

export function AttachmentFromJSON(json: any): Attachment {
    return AttachmentFromJSONTyped(json, false);
}

export function AttachmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Attachment {
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
        'permalink_template': !exists(json, 'permalink_template') ? undefined : json['permalink_template'],
        'generated_slug': !exists(json, 'generated_slug') ? undefined : json['generated_slug'],
        'title': !exists(json, 'title') ? undefined : PostTitleFromJSON(json['title']),
        'author': !exists(json, 'author') ? undefined : json['author'],
        'comment_status': !exists(json, 'comment_status') ? undefined : json['comment_status'],
        'ping_status': !exists(json, 'ping_status') ? undefined : json['ping_status'],
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'template': !exists(json, 'template') ? undefined : json['template'],
        'alt_text': !exists(json, 'alt_text') ? undefined : json['alt_text'],
        'caption': !exists(json, 'caption') ? undefined : AttachmentCaptionFromJSON(json['caption']),
        'description': !exists(json, 'description') ? undefined : AttachmentDescriptionFromJSON(json['description']),
        'media_type': !exists(json, 'media_type') ? undefined : json['media_type'],
        'mime_type': !exists(json, 'mime_type') ? undefined : json['mime_type'],
        'media_details': !exists(json, 'media_details') ? undefined : json['media_details'],
        'post': !exists(json, 'post') ? undefined : json['post'],
        'source_url': !exists(json, 'source_url') ? undefined : json['source_url'],
    };
}

export function AttachmentToJSON(value?: Attachment | null): any {
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
        'permalink_template': value.permalink_template,
        'generated_slug': value.generated_slug,
        'title': PostTitleToJSON(value.title),
        'author': value.author,
        'comment_status': value.comment_status,
        'ping_status': value.ping_status,
        'meta': value.meta,
        'template': value.template,
        'alt_text': value.alt_text,
        'caption': AttachmentCaptionToJSON(value.caption),
        'description': AttachmentDescriptionToJSON(value.description),
        'media_type': value.media_type,
        'mime_type': value.mime_type,
        'media_details': value.media_details,
        'post': value.post,
        'source_url': value.source_url,
    };
}

/**
* @export
* @enum {string}
*/
export enum AttachmentStatusEnum {
    Publish = 'publish',
    Future = 'future',
    Draft = 'draft',
    Pending = 'pending',
    Private = 'private'
}
/**
* @export
* @enum {string}
*/
export enum AttachmentCommentStatusEnum {
    Open = 'open',
    Closed = 'closed'
}
/**
* @export
* @enum {string}
*/
export enum AttachmentPingStatusEnum {
    Open = 'open',
    Closed = 'closed'
}
/**
* @export
* @enum {string}
*/
export enum AttachmentMediaTypeEnum {
    Image = 'image',
    File = 'file'
}


