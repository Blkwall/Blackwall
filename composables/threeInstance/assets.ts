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

export const loadAssets = (urls: string[], videoEls: HTMLVideoElement[]) => {
  return allValues({
    textures: allValues(
      urls.map((url) => {
        if (url.match(/\.(mp4)$/) != null) {
          const video = videoEls.filter((video) => video.dataset.id === url)[0];
          const texture = new VideoTexture(video);
          video.play();
          return texture;
        } else {
          return textureLoader.loadAsync(url);
        }
      })
    ),
  });
};
export type Assets = Awaited<ReturnType<typeof loadAssets>>;