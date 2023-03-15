import { TextureLoader, VideoTexture } from "three";

type AwaitedValues<T extends object> = {
  [K in keyof T]: Awaited<T[K]>;
};
const allValues = async <T extends object>(
  obj: T
): Promise<AwaitedValues<T>> => {
  const result: Partial<AwaitedValues<T>> = {};
  const keys = Object.keys(obj) as (keyof T)[];
  await Promise.all(
    keys.map(async (key) => {
      result[key] = await obj[key];
    })
  );
  return result as AwaitedValues<T>;
};

const textureLoader = new TextureLoader();

export const loadAssets = (urls: string[]) => {
  const imageUrls = urls.filter((url) => {
    // check url is an image.
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  });
  const videoUrls = urls.filter((url) => {
    // check url is a video.
    return url.match(/\.(mp4)$/) != null;
  });

  return allValues({
    textures: allValues(imageUrls.map((url) => textureLoader.loadAsync(url))),
    videoTextures: allValues(
      videoUrls.map((url) => {
        var video = document.createElement("video");
        video.setAttribute("src", url);
        video.setAttribute("autoplay", "true");
        video.setAttribute("loop", "true");
        video.setAttribute("muted", "true");
        video.setAttribute("playsinline", "true");
        video.setAttribute("preload", "auto");

        const texture = new VideoTexture(video);
        return texture;
      })
    ),
  });
};
export type Assets = Awaited<ReturnType<typeof loadAssets>>;
