import {
  Box3,
  BufferGeometry,
  Curve,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import { ThreeInstance } from ".";

export class HelixCurve extends Curve<Vector3> {
  radius: number;
  height: number;
  constructor(radius: number = 30, height: number = 150) {
    super();
    this.radius = radius;
    this.height = height;
  }

  getPoint(t: number, optionalTarget = new Vector3()) {
    const point = optionalTarget;

    const a = 1; // radius
    const b = this.height; // height

    const t2 = (2 * Math.PI * t * b) / this.radius;

    const x = Math.sin(t2) * a;
    const z = Math.cos(t2) * a;
    const y = b * t;

    // center point based on radius and height
    const center = new Vector3(0, b / 2, 0);
    return point.set(x, y, z);
  }
}

export class Spiral {
  instance: ThreeInstance;
  helixCurve: HelixCurve;
  line: Line;
  material: LineBasicMaterial;
  config: {
    radius: number;
    height: number;
  };
  helperSphere: Mesh<SphereGeometry, MeshBasicMaterial>;
  lineVisible: number = 0;
  constructor(instance: ThreeInstance, totalObjects?: number) {
    this.instance = instance;
    this.material = new LineBasicMaterial({
      color: 0x0000ff,
    });

    this.config = {
      radius: 7,
      height: this.instance.sceneObjectManager.totalHeight,
    };
    this.helixCurve = new HelixCurve(this.config.radius, this.config.height);
    this.line = this.drawCurveLine();
    this.instance.scene.add(this.line);
    this.helperSphere = new Mesh(
      new SphereGeometry(0.01, 32, 32),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    this.instance.scene.add(this.helperSphere);
  }

  get ratioOfLineVisible() {
    const camera = this.instance.cameraManager.camera;
    const FOV = camera.fov;
    let yFovRadiant = (FOV * Math.PI) / 180;
    const distance = camera.position.distanceTo(
      this.helixCurve.getPoint(1 - this.instance.progress)
    );
    const yShift = Math.tan(yFovRadiant / 4) * distance;
    return yShift / this.config.height;
  }

  updateCurve() {
    this.helixCurve = new HelixCurve(
      this.config.radius,
      this.instance.sceneObjectManager.totalHeight
    );
    this.line.geometry.dispose();
    this.line.geometry = this.drawCurveLine().geometry;
    this.lineVisible = this.ratioOfLineVisible;
  }

  drawCurveLine() {
    const points = this.helixCurve.getPoints(100);
    const geometry = new BufferGeometry().setFromPoints(points);

    return new Line(geometry, this.material);
  }
}
