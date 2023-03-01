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

    const a = this.radius; // radius
    const b = this.height; // height

    const t2 = (2 * Math.PI * t * b) / this.radius;

    const x = Math.cos(t2) * a;
    const z = Math.sin(t2) * a;
    const y = b * t;

    // center point based on radius and height
    const center = new Vector3(0, b / 2, 0);
    return point.set(x, y, z).sub(center);
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
  constructor(instance: ThreeInstance) {
    this.instance = instance;
    this.material = new LineBasicMaterial({
      color: 0x0000ff,
    });
    this.config = {
      radius: 25,
      height: 100,
    };
    this.helixCurve = new HelixCurve(this.config.radius, this.config.height);
    this.line = this.drawCurveLine();
    this.instance.scene.add(this.line);
    this.helperSphere = new Mesh(
      new SphereGeometry(2, 32, 32),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    this.instance.scene.add(this.helperSphere);
  }
  updateCurve() {
    this.helixCurve = new HelixCurve(this.config.radius, this.config.height);
    this.line.geometry.dispose();
    this.line.geometry = this.drawCurveLine().geometry;
  }

  drawCurveLine() {
    const points = this.helixCurve.getPoints(100);
    const geometry = new BufferGeometry().setFromPoints(points);

    return new Line(geometry, this.material);
  }
}
