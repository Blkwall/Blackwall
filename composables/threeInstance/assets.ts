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
  return allValues({
    textures: allValues(
      urls.map((url) => {
        if (url.match(/\.(mp4)$/) != null) {
          var video = document.createElement("video");
          video.setAttribute("src", url);
          video.setAttribute("autoplay", "true");
          video.setAttribute("loop", "true");
          video.setAttribute("muted", "true");
          video.setAttribute("playsinline", "true");
          video.setAttribute("preload", "auto");
          const texture = new VideoTexture(video);
          return texture;
        } else {
          return textureLoader.loadAsync(url);
        }
      })
    ),
  });
};
export type Assets = Awaited<ReturnType<typeof loadAssets>>;
