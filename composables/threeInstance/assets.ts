import { TextureLoader } from "three";

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

export const loadAssets = (urls: string[]) =>
  allValues({
    textures: allValues(urls.map((url) => textureLoader.loadAsync(url))),
  });
export type Assets = Awaited<ReturnType<typeof loadAssets>>;
