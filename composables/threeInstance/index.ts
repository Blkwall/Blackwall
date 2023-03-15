import { Color, Scene, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { Assets, loadAssets } from "./assets";
import { CameraManager } from "./camera";
import { ObjectManager } from "./objects";
import { Lights } from "./lights";
import { Spiral } from "./spiral";
import { ConfigManager } from "./config";

const config = {
  name: "Blackwall",
};
export class ThreeInstance {
  el: HTMLElement;
  assets: Assets;
  renderer: WebGLRenderer;
  configManager: ConfigManager;
  cameraManager: CameraManager;
  scene: Scene;
  lightsManager: Lights;
  stats: Stats;
  objectManager: ObjectManager;
  spiral: Spiral;

  debugMode = false;

  constructor(el: HTMLElement, assets: Assets) {
    this.el = el;
    this.assets = assets;

    this.renderer = new WebGLRenderer({ antialias: true, alpha: false });
    el.appendChild(this.renderer.domElement);

    this.configManager = new ConfigManager(this);

    this.scene = new Scene();
    this.cameraManager = new CameraManager(this);

    this.lightsManager = new Lights(this);
    this.lightsManager.lights.forEach((light) => this.scene.add(light));

    this.stats = Stats();

    window.addEventListener("resize", () => this.resize());
    this.resize();

    // Add objects.
    this.objectManager = new ObjectManager(this);
    // Make spiral.
    this.spiral = new Spiral(this, this.objectManager.totalObjects);
    // Place objects.
    this.objectManager.placeObjects(this.spiral.helixCurve);
  }

  resize() {
    const { camera } = this.cameraManager;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    const { camera, debugCamera } = this.cameraManager;

    if (this.debugMode) {
      const width = (window.innerWidth / 3) * 2;
      const height = window.innerHeight;
      this.renderer.setViewport(0, 0, width, height);
      this.renderer.setScissor(0, 0, width, height);
      this.renderer.setScissorTest(true);
      this.renderer.setClearColor(new Color(0x000000));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      this.cameraManager.helper.visible = false;
      this.spiral.line.visible = false;
      this.spiral.helperSphere.visible = false;
      this.renderer.render(this.scene, camera);

      const debugWidth = window.innerWidth / 3;
      const debugHeight = window.innerHeight;
      this.renderer.setViewport(width, 0, debugWidth, debugHeight);
      this.renderer.setScissor(width, 0, debugWidth, debugHeight);
      this.renderer.setScissorTest(true);
      this.renderer.setClearColor(new Color(0x333333));
      debugCamera.aspect = debugWidth / debugHeight;
      debugCamera.updateProjectionMatrix();

      this.cameraManager.helper.visible = true;
      this.spiral.line.visible = true;
      this.spiral.helperSphere.visible = true;
      this.renderer.render(this.scene, debugCamera);
    } else {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setViewport(0, 0, width, height);
      this.renderer.setScissor(0, 0, width, height);
      this.renderer.setScissorTest(true);
      this.renderer.setClearColor(new Color(0x000000));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      this.cameraManager.helper.visible = false;
      this.spiral.line.visible = false;
      this.spiral.helperSphere.visible = false;
      this.renderer.render(this.scene, camera);
    }
  }

  // progress = 1;
  get progress() {
    const progress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);

    return progress;
  }

  scrollDirection = 0;
  lastScrollY = 0;
  update() {
    if (this.lastScrollY < window.scrollY) {
      this.scrollDirection = 1;
    } else {
      this.scrollDirection = -1;
    }

    if (this.progress > 0.95 && this.scrollDirection > 0) {
      const height = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, height * 0.05);
    }
    if (this.progress < 0.05 && this.scrollDirection < 0) {
      const height = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, height * 0.95);
    }

    this.spiral.helperSphere.position.copy(
      this.spiral.helixCurve.getPointAt(this.progress)
    );
    this.objectManager.update();
    this.cameraManager.update(this.progress);

    this.lastScrollY = window.scrollY;
  }

  animationId = 0;
  tick() {
    this.update();
    this.render();
    this.stats.update();
    this.animationId = requestAnimationFrame(() => this.tick());
  }

  static async load(el: HTMLElement, assets: string[]) {
    return new ThreeInstance(el, await loadAssets(assets));
  }

  destroy() {
    document.body.style.height = "auto";
    this.el.removeChild(this.renderer.domElement);
    cancelAnimationFrame(this.animationId);
  }
}
