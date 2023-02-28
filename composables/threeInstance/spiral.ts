import {
  Box3,
  BufferGeometry,
  Curve,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";
import { ThreeInstance } from ".";

class HelixCurve extends Curve<Vector3> {
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
  constructor(instance: ThreeInstance) {
    this.instance = instance;
    this.material = new LineBasicMaterial({
      color: 0x0000ff,
    });
    this.helixCurve = new HelixCurve(20, 100);
    this.line = this.drawCurveLine();
    // this.instance.scene.add(this.line);
  }

  drawCurveLine() {
    const points = this.helixCurve.getPoints(100);
    const geometry = new BufferGeometry().setFromPoints(points);

    return new Line(geometry, this.material);
  }
}
