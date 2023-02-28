import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
  WebGLRendererParameters,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { Assets, loadAssets } from "./assets";
import { CameraManager } from "./camera";
import { Lights } from "./lights";
import { Spiral } from "./spiral";

export const config = {
  debug: !true,
};

export class ThreeInstance {
  el: HTMLElement;
  assets: Assets;
  renderer: WebGLRenderer;
  cameraManager: CameraManager;
  scene: Scene;
  lightsManager: Lights;
  stats: Stats;
  images: { [key: string]: Group };
  spiral: Spiral;
  constructor(el: HTMLElement, assets: Assets) {
    this.el = el;
    this.assets = assets;

    this.renderer = new WebGLRenderer({
      antialias: true,
    } as WebGLRendererParameters);

    el.appendChild(this.renderer.domElement);
    document.body.style.height = "10000px";

    this.cameraManager = new CameraManager(this);
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);

    this.lightsManager = new Lights(this);
    this.lightsManager.lights.forEach((light) => this.scene.add(light));

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    window.addEventListener("resize", () => this.resize());
    this.resize();

    this.spiral = new Spiral(this);

    // Add images.
    this.images = {};

    const keys = Object.keys(this.assets.textures);
    const totalkeys = keys;
    totalkeys.forEach((key: any, index) => {
      const size = 10;
      const texture = this.assets.textures[key];
      const ratio = texture.image.height / texture.image.width;

      const geometry = new PlaneGeometry(size, size * ratio);

      const group = new Group();
      const randomInt = Math.ceil(Math.random() * 4) + 1;

      for (let i = 0; i < randomInt; i++) {
        const material = new MeshBasicMaterial({
          map: texture,
          side: DoubleSide,
          // color: new Color(0xffffff),
          transparent: true,
          blending: i == 0 ? NormalBlending : AdditiveBlending,
        });
        const mesh = new Mesh(geometry, material);
        mesh.position.z += size * 0.05 * i;
        group.add(mesh);
      }
      this.images[key] = group;
      const point = this.spiral.helixCurve.getPointAt(
        index / (totalkeys.length - 1)
      );
      this.images[key].position.copy(point);

      this.scene.add(this.images[key]);
      this.cameraManager.camera.position.set(0, 0, 40);
      this.cameraManager.camera.lookAt(new Vector3(0, 0, 0));
    });
  }

  resize() {
    const { camera } = this.cameraManager;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    const { camera } = this.cameraManager;
    this.renderer.render(this.scene, camera);
  }

  // progress = 1;
  get progress() {
    return window.scrollY / (document.body.scrollHeight - window.innerHeight);
  }
  update() {
    const currentPoint = this.spiral.helixCurve.getPointAt(this.progress);
    const direction = this.spiral.helixCurve.getTangentAt(this.progress);
    this.cameraManager.camera.position.copy(
      currentPoint.clone().add(direction.multiplyScalar(30))
    );
    this.cameraManager.camera.lookAt(new Vector3(0, currentPoint.y, 0));

    Object.keys(this.images).forEach((key) => {
      const pos = this.images[key].position.clone();
      const fakeCameraPos = this.cameraManager.camera.position.clone();
      fakeCameraPos.y = pos.y;
      this.images[key].lookAt(fakeCameraPos);
    });

    this.cameraManager.update();
  }
  tick() {
    this.update();
    this.render();
    this.stats.update();
    requestAnimationFrame(() => this.tick());
  }

  static async load(el: HTMLElement, assets: string[]) {
    return new ThreeInstance(el, await loadAssets(assets));
  }
}
