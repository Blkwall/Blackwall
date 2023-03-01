import { ThreeInstance } from ".";

export class ConfigManager {
  instance: ThreeInstance;
  gui: dat.GUI | null = null;

  constructor(instance: ThreeInstance) {
    this.instance = instance;
  }
  init(dat: any) {
    if (!this.gui) this.gui = new dat.GUI();
    if (!this.gui) {
      console.error("dat.gui not found");
      return;
    }

    // DEBUG
    const debugFolder = this.gui.addFolder("Debug");
    debugFolder.open();
    const debugCamera = { debugCamera: this.instance.debugMode };
    debugFolder.add(debugCamera, "debugCamera").onChange((value) => {
      this.instance.debugMode = value;
    });

    // IMAGES
    const imageFolder = this.gui.addFolder("Images");
    imageFolder.open();
    const imageSize = { size: 10 };
    imageFolder.add(imageSize, "size", 1, 100).onChange((value) => {
      const { imageManager, spiral, assets } = this.instance;
      imageManager.imageSize = value;
      imageManager.drawModels(assets.textures);
      imageManager.placeModels(spiral.helixCurve);
    });

    const imageGap = { gap: 0.5 };
    imageFolder.add(imageGap, "gap", 0.01, 5).onChange((value) => {
      const { imageManager, spiral, assets } = this.instance;
      imageManager.imageGap = value;
      imageManager.drawModels(assets.textures);
      imageManager.placeModels(spiral.helixCurve);
    });

    // CAMERA
    const cameraFolder = this.gui.addFolder("Camera");
    cameraFolder.open();
    const fov = { fov: 75 };
    cameraFolder.add(fov, "fov", 1, 180).onChange((value) => {
      const { camera } = this.instance.cameraManager;
      camera.fov = value;
      camera.updateProjectionMatrix();
    });
    const distance = { distance: this.instance.cameraManager.config.distance };
    cameraFolder.add(distance, "distance", 10, 100).onChange((value) => {
      const { config } = this.instance.cameraManager;
      config.distance = value;
    });

    // SPIRAL
    const spiralFolder = this.gui.addFolder("Spiral");
    spiralFolder.open();
    const spiral = {
      radius: this.instance.spiral.config.radius,
      height: this.instance.spiral.config.height,
    };
    spiralFolder.add(spiral, "radius", 1, 100).onChange((value) => {
      const { spiral, imageManager } = this.instance;
      spiral.config.radius = value;
      spiral.updateCurve();
      imageManager.placeModels(spiral.helixCurve);
    });
    spiralFolder.add(spiral, "height", 10, 500).onChange((value) => {
      const { spiral, imageManager } = this.instance;
      spiral.config.height = value;
      spiral.updateCurve();
      imageManager.placeModels(spiral.helixCurve);
    });
  }
}
