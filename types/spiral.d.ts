declare module "three/addons/curves/CurveExtras.js" {
  export class HelixCurve extends Curve<Vector3> {
    constructor();
    getPoints(t: number, optionalTarget?: Vector3): Vector3;
  }
}
