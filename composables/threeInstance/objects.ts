import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PlaneGeometry,
  Texture,
  Vector3,
  VideoTexture,
} from "three";

import { ThreeInstance } from "./index";
import { HelixCurve } from "./spiral";

type ObjectGroup = {
  group: Group;
  direction?: Vector3;
};

export class ObjectManager {
  threeInstance: ThreeInstance;
  objects: { [key: string]: ObjectGroup } = {};
  objectSize = 10;
  gap = 0.35;
  loop: boolean = true;
  lookAtCamera: boolean = false;

  constructor(
    threeInstance: ThreeInstance,
    textures: Texture[],
    videoTextures: VideoTexture[],
    loop?: boolean
  ) {
    this.threeInstance = threeInstance;
    this.loop = loop || this.loop;

    this.drawObjects(textures, videoTextures);
  }

  get totalObjects() {
    return Object.keys(this.objects).length;
  }

  makeMaterial(texture: Texture, normalMode: boolean) {
    return new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
      transparent: true,
      color: 0xffffff,
      blending: normalMode ? NormalBlending : AdditiveBlending,
    });
  }

  resetModels() {
    // Reset models.
    Object.keys(this.objects).forEach((key: any) => {
      this.threeInstance.scene.remove(this.objects[key].group);
    });
    this.objects = {};
  }

  drawImage(texture: Texture, layers: number) {
    const ratio = texture.image.height / texture.image.width;
    const group = new Group();
    const geometry = new PlaneGeometry(
      this.objectSize,
      this.objectSize * ratio
    );

    for (let i = 0; i < layers; i++) {
      const material = this.makeMaterial(texture, i === layers - 1);
      const mesh = new Mesh(geometry, material);
      mesh.position.z -= this.gap * i;
      group.add(mesh);
    }
    return group;
  }

  drawVideo(texture: VideoTexture, layers: number) {
    const ratio = 9 / 16;
    const group = new Group();
    const geometry = new PlaneGeometry(
      this.objectSize * 1.5,
      this.objectSize * 1.5 * ratio
    );

    for (let i = 0; i < layers; i++) {
      const material = new MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true,
        blending: i === layers - 1 ? NormalBlending : AdditiveBlending,
      });
      const mesh = new Mesh(geometry, material);
      mesh.position.z -= this.gap * i;
      group.add(mesh);
    }

    return group;
  }

  drawObjects(images: Texture[], videos: VideoTexture[]) {
    this.resetModels();

    // Add new objects.
    const imageKeys = Object.keys(images);
    imageKeys.forEach((key: any) => {
      const layers = Math.ceil(Math.random() * 4) + 1;
      const texture = images[key];

      const group = this.drawImage(texture, layers);
      this.objects[key] = {
        group,
      };
    });

    const videoKeys = Object.keys(videos);
    videoKeys.forEach((key: any) => {
      const layers = Math.ceil(Math.random() * 4) + 1;
      const texture = videos[key];
      const group = this.drawVideo(texture, layers);
      this.objects[key] = {
        group,
      };
    });

    // Set loop.
    if (this.loop) {
      const clone = {
        group: this.objects[0].group.clone(),
        direction: this.objects[0].direction,
      };
      this.objects["clone"] = clone;
    }
  }

  placeObjects(helixCurve: HelixCurve) {
    Object.keys(this.objects).forEach((key: any, index: number) => {
      const { group } = this.objects[key];
      const alpha = index / (this.totalObjects - 1);
      const mappedAlpha = map(alpha, 0, 1, 0.05, 0.95);
      const point = helixCurve.getPointAt(mappedAlpha);

      const center = new Vector3(0, point.y, 0);
      const direction = point.clone().sub(center).normalize();
      this.objects[key].direction = point.clone().add(direction);
      group.position.copy(point);

      this.threeInstance.scene.add(group);
    });

    document.body.style.height = this.totalObjects * 100 + "vh";
  }

  update() {
    const cameraPos = this.threeInstance.cameraManager.camera.position.clone();

    Object.keys(this.objects).forEach((key: any) => {
      const { group, direction } = this.objects[key];
      if (!this.lookAtCamera && direction) group.lookAt(direction);
      else group.lookAt(cameraPos);
    });
  }
}
