// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Contact documents */
interface ContactDocumentData {
    /**
     * Slice Zone field in *Contact*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<ContactDocumentDataSlicesSlice>;
}
/**
 * Slice for *Contact → Slice Zone*
 *
 */
type ContactDocumentDataSlicesSlice = TextSlice;
/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<ContactDocumentData>, "contact", Lang>;
/** Content for Home documents */
interface HomeDocumentData {
    /**
     * Background Video field in *Home*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: home.background_video
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    background_video: prismicT.LinkToMediaField;
    /**
     * Slice Zone field in *Home*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: home.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<HomeDocumentDataSlicesSlice>;
}
/**
 * Slice for *Home → Slice Zone*
 *
 */
type HomeDocumentDataSlicesSlice = SceneObjectSlice;
/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;
/** Content for Projects documents */
interface ProjectsDocumentData {
    /**
     * Tagline field in *Projects*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: projects.tagline
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    tagline: prismicT.KeyTextField;
    /**
     * Slice Zone field in *Projects*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: projects.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<ProjectsDocumentDataSlicesSlice>;
}
/**
 * Slice for *Projects → Slice Zone*
 *
 */
type ProjectsDocumentDataSlicesSlice = ProjectSlice;
/**
 * Projects document from Prismic
 *
 * - **API ID**: `projects`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProjectsDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<ProjectsDocumentData>, "projects", Lang>;
export type AllDocumentTypes = ContactDocument | HomeDocument | ProjectsDocument;
/**
 * Primary content in Project → Primary
 *
 */
interface ProjectSliceDefaultPrimary {
    /**
     * Width field in *Project → Primary*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **API ID Path**: project.primary.width
     * - **Documentation**: https://prismic.io/docs/core-concepts/select
     *
     */
    width: prismicT.SelectField<"1/3" | "1/2" | "Full" | "1/4">;
    /**
     * Caption field in *Project → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your product
     * - **API ID Path**: project.primary.caption
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    caption: prismicT.RichTextField;
    /**
     * Vimeo Link field in *Project → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: project.primary.vimeo_link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    vimeo_link: prismicT.LinkField;
    /**
     * Video Preview field in *Project → Primary*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: project.primary.video_preview
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    video_preview: prismicT.LinkToMediaField;
    /**
     * Video Preview Poster field in *Project → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: project.primary.video_preview_poster
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    video_preview_poster: prismicT.ImageField<never>;
}
/**
 * Item in Project → Items
 *
 */
export interface ProjectSliceDefaultItem {
    /**
     * Image field in *Project → Items*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: project.items[].image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
}
/**
 * Default variation for Project Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Project`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProjectSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<ProjectSliceDefaultPrimary>, Simplify<ProjectSliceDefaultItem>>;
/**
 * Slice variation for *Project*
 *
 */
type ProjectSliceVariation = ProjectSliceDefault;
/**
 * Project Shared Slice
 *
 * - **API ID**: `project`
 * - **Description**: `Project`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProjectSlice = prismicT.SharedSlice<"project", ProjectSliceVariation>;
/**
 * Primary content in SceneObject → Primary
 *
 */
interface SceneObjectSliceDefaultPrimary {
    /**
     * image field in *SceneObject → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: scene_object.primary.image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
    /**
     * layers field in *SceneObject → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: scene_object.primary.layers
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    layers: prismicT.NumberField;
}
/**
 * Default variation for SceneObject Slice
 *
 * - **API ID**: `default`
 * - **Description**: `SceneObject`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SceneObjectSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<SceneObjectSliceDefaultPrimary>, never>;
/**
 * Primary content in SceneObject → Primary
 *
 */
interface SceneObjectSliceSceneObjectVideoPrimary {
    /**
     * video field in *SceneObject → Primary*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: scene_object.primary.video
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    video: prismicT.LinkToMediaField;
    /**
     * layers field in *SceneObject → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: scene_object.primary.layers
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    layers: prismicT.NumberField;
    /**
     * Video width field in *SceneObject → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: scene_object.primary.video_width
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    video_width: prismicT.NumberField;
    /**
     * Video Height field in *SceneObject → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: scene_object.primary.video_height
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    video_height: prismicT.NumberField;
}
/**
 * Scene Object Video variation for SceneObject Slice
 *
 * - **API ID**: `sceneObjectVideo`
 * - **Description**: `SceneObject`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SceneObjectSliceSceneObjectVideo = prismicT.SharedSliceVariation<"sceneObjectVideo", Simplify<SceneObjectSliceSceneObjectVideoPrimary>, never>;
/**
 * Slice variation for *SceneObject*
 *
 */
type SceneObjectSliceVariation = SceneObjectSliceDefault | SceneObjectSliceSceneObjectVideo;
/**
 * SceneObject Shared Slice
 *
 * - **API ID**: `scene_object`
 * - **Description**: `SceneObject`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SceneObjectSlice = prismicT.SharedSlice<"scene_object", SceneObjectSliceVariation>;
/**
 * Primary content in Text → Primary
 *
 */
interface TextSliceDefaultPrimary {
    /**
     * Text field in *Text → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: text.primary.text
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    text: prismicT.RichTextField;
}
/**
 * Default variation for Text Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Text`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<TextSliceDefaultPrimary>, never>;
/**
 * Slice variation for *Text*
 *
 */
type TextSliceVariation = TextSliceDefault;
/**
 * Text Shared Slice
 *
 * - **API ID**: `text`
 * - **Description**: `Text`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextSlice = prismicT.SharedSlice<"text", TextSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { ContactDocumentData, ContactDocumentDataSlicesSlice, ContactDocument, HomeDocumentData, HomeDocumentDataSlicesSlice, HomeDocument, ProjectsDocumentData, ProjectsDocumentDataSlicesSlice, ProjectsDocument, AllDocumentTypes, ProjectSliceDefaultPrimary, ProjectSliceDefaultItem, ProjectSliceDefault, ProjectSliceVariation, ProjectSlice, SceneObjectSliceDefaultPrimary, SceneObjectSliceDefault, SceneObjectSliceSceneObjectVideoPrimary, SceneObjectSliceSceneObjectVideo, SceneObjectSliceVariation, SceneObjectSlice, TextSliceDefaultPrimary, TextSliceDefault, TextSliceVariation, TextSlice };
    }
}
