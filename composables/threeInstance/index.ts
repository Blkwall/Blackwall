import { Color, Raycaster, Scene, WebGLRenderer } from "three";
import * as TWEEN from "@tweenjs/tween.js";

import Stats from "three/examples/jsm/libs/stats.module";
import { Assets } from "./assets";
import { CameraManager } from "./camera";
import { SceneObjectManager } from "./SceneObjects";
import { Lights } from "./lights";
import { Spiral } from "./spiral";
import { ConfigManager } from "./config";
import { InputManager } from "./input";
import { Animation } from "./animation";
import { sequence_intro, sequence_main } from "./Sequences";
import { sequence_exit } from "./Sequences/exit";
import { StoreDefinition } from "pinia";

const hash = process.client ? window.location.hash : false;

export class ThreeInstance {
  el: HTMLElement;
  assets: Assets;
  slices: any[];

  renderer: WebGLRenderer;

  configManager: ConfigManager;
  cameraManager: CameraManager;
  scene: Scene;
  lightsManager: Lights;
  stats: Stats;
  sceneObjectManager: SceneObjectManager;
  inputManager: InputManager;
  spiral: Spiral;

  debugMode = hash === "#debug";
  sequences: { [key: string]: Animation };
  activeSequenceKey: string = "intro";

  isProjects: boolean = false;
  raycaster: Raycaster = new Raycaster();

  constructor(el: HTMLElement, assets: Assets, slices: any[]) {
    this.el = el;
    this.assets = assets;
    this.slices = slices;

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
    window.addEventListener("orientationchange", () => this.resize());
    this.resize();
    document.body.style.overflow = "hidden";

    // Add objects.
    this.sceneObjectManager = new SceneObjectManager(this);
    // Make spiral.
    this.spiral = new Spiral(this);
    // Place objects.
    this.sceneObjectManager.placeObjects(this.spiral.helixCurve);

    this.sequences = {
      intro: sequence_intro,
      main: sequence_main,
      exit: sequence_exit,
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

  currentSequence: null | string = null;
  update() {
    if (this.currentSequence !== this.activeSequenceKey) {
      this.currentSequence = this.activeSequenceKey;
      window.dispatchEvent(new CustomEvent("sequenceChange"));
    }
    this.sequences[this.activeSequenceKey].update(this.progress, this);
    this.stats.update();
    this.raycaster.setFromCamera(
      this.inputManager.mousePosition,
      this.cameraManager.camera
    );
  }

  animationId = 0;
  tick() {
    if (!this.isProjects) {
      this.update();
      this.render();
      TWEEN.update();
    }
    this.animationId = requestAnimationFrame(() => this.tick());
  }

  destroy() {
    document.body.style.overflow = "auto";
    this.el.removeChild(this.renderer.domElement);
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", () => this.resize());
  }

  async triggerExit() {
    this.activeSequenceKey = "exit";
    return new Promise((r) => setTimeout(r, 1000));
  }

  setIsProjects(isProjects: boolean) {
    this.isProjects = isProjects;
    if (this.isProjects) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }
}
