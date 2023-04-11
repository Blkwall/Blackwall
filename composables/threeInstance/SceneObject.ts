import {
  AdditiveBlending,
  Blending,
  DoubleSide,
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MultiplyBlending,
  NormalBlending,
  Object3D,
  PlaneGeometry,
  Texture,
  Vector2,
  Vector3,
  VideoTexture,
} from "three";
import { SceneObjectManager } from "./SceneObjects";

type SceneObjectProps = {
  texture: Texture | VideoTexture;
  sceneManager: SceneObjectManager;
  ratio: number;
  layers: number;
  index: number;
};

export class SceneObject {
  texture: Texture | VideoTexture;
  sceneManager: SceneObjectManager;
  size: number;
  ratio: number;
  layers: number;
  object: Group;
  gap: number;
  direction: Vector3 = new Vector3(0, 0, 0);
  alpha: number = 0;
  index: number;
  pos: Vector3 = new Vector3(0, 0, 0);
  boundaries: {
    top: number;
    bottom: number;
  } = {
    top: 0,
    bottom: 0,
  };
  constructor({
    texture,
    sceneManager,
    ratio,
    layers,
    index,
  }: SceneObjectProps) {
    // load props.
    this.texture = texture;
    this.sceneManager = sceneManager;
    this.ratio = ratio;
    this.layers = layers;
    this.gap = sceneManager.gap;
    this.size = sceneManager.objectSize;
    this.index = index;
    // draw object
    this.object = this.drawOject();
  }

  get getHeight() {
    return this.size * this.ratio;
  }

  makeMaterial(texture: Texture, blending: Blending) {
    return new MeshBasicMaterial({
      map: texture,
      side: FrontSide,
      transparent: true,
      color: 0xffffff,
      blending,
    });
  }

  drawOject() {
    const group = new Group();
    const geometry = new PlaneGeometry(this.size, this.size * this.ratio);

    for (let i = 0; i < this.layers; i++) {
      let blendMode = AdditiveBlending;
      if (i === 1) blendMode = MultiplyBlending;
      const material = this.makeMaterial(this.texture, blendMode);
      const mesh = new Mesh(geometry, material);
      mesh.position.z -= this.gap * i;
      group.add(mesh);
    }

    return group;
  }

  update(progress: number, mousePosition: Vector2) {
    const distance = this.getWrappedProgress(this.alpha, progress);
    const mappedDistance = map(distance, 0, 0.5, 1, 0);

    const { lineVisible } = this.sceneManager.threeInstance.spiral;
    this.object.visible = 1 - mappedDistance < lineVisible;

    const { x, y } = mousePosition;
    const mousePos3d = new Vector3(x * -1, y * -1, 0);
    const lookAt = this.direction.clone().add(mousePos3d.multiplyScalar(0.1));
    this.object.lookAt(lookAt);
  }

  public static isVideoTexture(texture: Texture | VideoTexture) {
    return (texture as VideoTexture).isVideoTexture || false;
  }

  public getWrappedProgress(a: number, b: number) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 1 - diff);
  }
}
