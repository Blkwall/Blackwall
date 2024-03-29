import {
  AdditiveBlending,
  Blending,
  Box3,
  DoubleSide,
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MultiplyBlending,
  PlaneGeometry,
  SphereGeometry,
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
  raycasterReceiver: Group;
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
    if (this.ratio >= 1) this.size = this.size * 0.7;
    if (window.innerWidth < 768) this.size = this.size * 0.5;
    this.object = this.drawOject();
    this.raycasterReceiver = this.drawRaycasterReceiver();
  }

  get getHeight() {
    return this.size * this.ratio;
    // const box = new Box3().setFromObject(this.object);
    // return box.max.y - box.min.y;
  }

  makeMaterial(texture: Texture, blending: Blending) {
    const hash = window.location.hash;
    return new MeshBasicMaterial({
      map: texture,
      side: hash === "#double" ? DoubleSide : FrontSide,
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

  drawRaycasterReceiver() {
    const group = new Group();
    const geometry = new PlaneGeometry(this.size, this.size * this.ratio);
    const material = new MeshBasicMaterial({ transparent: true, opacity: 0 });
    const mesh = new Mesh(geometry, material);
    mesh.position.z += this.gap * 0.1;
    group.add(mesh);
    return group;
  }

  raycasterLerp = new Vector3();
  firstFrame = true;
  update(progress: number, willLookAt: boolean) {
    const distance = this.getWrappedProgress(this.alpha, progress);
    const mappedDistance = map(distance, 0, 0.5, 1, 0);

    const { lineVisible } = this.sceneManager.threeInstance.spiral;
    this.object.visible = 1 - mappedDistance < lineVisible;

    const { raycaster } = this.sceneManager.threeInstance;
    const intersection = raycaster.intersectObject(this.raycasterReceiver)[0];

    const raycasterPoint = intersection
      ? intersection.point
      : this.object.position.clone();

    this.raycasterLerp.lerp(raycasterPoint, 0.1);
    if (this.firstFrame) this.raycasterLerp.copy(this.object.position);

    const center = new Vector3(0, this.object.position.y, 0);
    const direction = this.object.position.clone().sub(center).normalize();

    const lookAt = this.raycasterLerp.clone().add(direction);

    this.object.lookAt(willLookAt ? lookAt : this.direction);
    this.raycasterReceiver.lookAt(this.direction);
    if (this.firstFrame) this.firstFrame = false;
  }

  public static isVideoTexture(texture: Texture | VideoTexture) {
    return (texture as VideoTexture).isVideoTexture || false;
  }

  public getWrappedProgress(a: number, b: number) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 1 - diff);
  }
}
