import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PlaneGeometry,
  Texture,
} from "three";

import { ThreeInstance } from "./index";
import { HelixCurve } from "./spiral";

export class ImageManager {
  threeInstance: ThreeInstance;
  models: Group[] = [];
  imageSize = 10;
  imageGap = 0.5;
  loop: boolean = true;
  fixLookAtAxis: boolean = true;

  constructor(threeInstance: ThreeInstance, images: Texture[], loop?: boolean) {
    this.threeInstance = threeInstance;
    this.loop = loop || this.loop;
    this.drawModels(images);
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

  drawModels(images: Texture[]) {
    this.models.forEach((model) => {
      this.threeInstance.scene.remove(model);
    });

    this.models = [];

    Object.keys(images).forEach((key: any) => {
      const texture = images[key];
      const ratio = texture.image.height / texture.image.width;

      const group = new Group();
      const geometry = new PlaneGeometry(
        this.imageSize,
        this.imageSize * ratio
      );

      const numberOfImagesRepeated = Math.ceil(Math.random() * 4) + 1;
      for (let i = 0; i < numberOfImagesRepeated; i++) {
        const material = this.makeMaterial(
          texture,
          i === numberOfImagesRepeated - 1
        );
        const mesh = new Mesh(geometry, material);
        mesh.position.z -= this.imageGap * i;
        group.add(mesh);
      }
      this.models.push(group);
    });

    if (this.loop) {
      this.models.slice(0, 1).forEach((model) => {
        const clone = model.clone();
        this.models.push(clone);
      });
    }
  }

  placeModels(helixCurve: HelixCurve) {
    this.models.forEach((model, index) => {
      const alpha = index / (this.models.length - 1);
      const mappedAlpha = map(alpha, 0, 1, 0.05, 0.95);
      const point = helixCurve.getPointAt(mappedAlpha);
      model.position.copy(point);
      this.threeInstance.scene.add(model);
    });
    document.body.style.height = this.models.length * 100 + "vh";
  }

  update() {
    const cameraPos = this.threeInstance.cameraManager.camera.position.clone();
    this.models.forEach((model) => {
      const pos = model.position.clone();
      const fakeCameraPos = cameraPos;
      if (this.fixLookAtAxis) fakeCameraPos.y = pos.y;
      model.lookAt(fakeCameraPos);
    });
  }
}
