import {
  Color,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import * as TWEEN from "@tweenjs/tween.js";

import Stats from "three/examples/jsm/libs/stats.module";
import { Assets, loadAssets } from "./assets";
import { CameraManager } from "./camera";
import { SceneObjectManager } from "./SceneObjects";
import { Lights } from "./lights";
import { Spiral } from "./spiral";
import { ConfigManager } from "./config";
import { InputManager } from "./input";
import { Animation } from "./animation";
import { sequence_intro } from "./Sequences/intro";
import { sequence_main } from "./Sequences/main";

export class ThreeInstance {
  el: HTMLElement;
  assets: Assets;
  renderer: WebGLRenderer;

  configManager: ConfigManager;
  cameraManager: CameraManager;
  scene: Scene;
  lightsManager: Lights;
  stats: Stats;
  sceneObjectManager: SceneObjectManager;
  inputManager: InputManager;
  spiral: Spiral;
  logo: Object3D;

  debugMode = false;
  sequences: { [key: string]: Animation };
  activeSequenceKey: string = "intro";

  constructor(el: HTMLElement, assets: Assets) {
    this.el = el;
    this.assets = assets;

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    el.appendChild(this.renderer.domElement);

    this.configManager = new ConfigManager(this);

    this.scene = new Scene();
    this.cameraManager = new CameraManager(this);

    this.lightsManager = new Lights(this);
    this.lightsManager.lights.forEach((light) => this.scene.add(light));

    this.inputManager = new InputManager(this);
    this.stats = Stats();

    window.addEventListener("resize", () => this.resize());
    this.resize();

    // Add objects.
    this.sceneObjectManager = new SceneObjectManager(this);
    // Make spiral.
    this.spiral = new Spiral(this);
    // Place objects.
    this.sceneObjectManager.placeObjects(this.spiral.helixCurve);

    this.logo = new Mesh(
      new PlaneGeometry(
        5,
        (5 * this.assets.logo.image.height) / this.assets.logo.image.width
      ),
      new MeshBasicMaterial({ map: this.assets.logo, transparent: true })
    );

    // this.scene.add(this.logo);

    this.sequences = {
      intro: sequence_intro,
      main: sequence_main,
    };
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
      // this.renderer.setClearColor(new Color(0x000000));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      this.cameraManager.helper.visible = false;
      this.spiral.line.visible = false;
      this.spiral.helperSphere.visible = false;
      this.renderer.render(this.scene, camera);
    }
  }

  get progress() {
    const progress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);

    return progress;
  }

  update() {
    // Update logo position.
    // const camPos = this.cameraManager.camera.position.clone();
    // const camDir = this.cameraManager.camera.getWorldDirection(new Vector3());
    // this.logo.position.copy(camPos.add(camDir.multiplyScalar(5)));
    // this.logo.lookAt(this.cameraManager.camera.position);

    this.sequences[this.activeSequenceKey].update(this.progress, this);
  }

  animationId = 0;
  tick() {
    this.update();
    this.render();
    this.stats.update();
    this.animationId = requestAnimationFrame(() => this.tick());
    TWEEN.update();
  }

  static async load(
    el: HTMLElement,
    assets: string[],
    videoEls: HTMLVideoElement[]
  ) {
    return new ThreeInstance(el, await loadAssets(assets, videoEls));
  }

  destroy() {
    document.body.style.height = "auto";
    this.el.removeChild(this.renderer.domElement);
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", () => this.resize());
  }
}
