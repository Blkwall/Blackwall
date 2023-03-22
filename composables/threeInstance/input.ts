import { Vector2 } from "three/src/math/Vector2";
import { ThreeInstance } from ".";

export class InputManager {
  mousePosition = new Vector2(0, 0);
  current = 0;

  constructor(private threeInstance: ThreeInstance) {
    this.threeInstance = threeInstance;
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("wheel", (e) => this.onWheel(e));

    window.addEventListener("touchstart", (e) => this.onTouchStart(e));
    window.addEventListener("touchmove", (e) => this.onTouchMove(e));
    window.addEventListener("touchend", (e) => this.onTouchEnd(e));
  }

  onMouseMove(e: MouseEvent) {
    this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  get progress() {
    return this.current / this.total;
  }
  get total() {
    return (
      this.threeInstance.sceneObjectManager.totalHeight * window.innerHeight
    );
  }

  onWheel(e: WheelEvent) {
    this.current += e.deltaY;
    // wrap around
    if (this.current < 0) this.current = this.total;
    if (this.current > this.total) this.current = 0;
  }

  lastTouchY = 0;
  touchAcceleration = 0;
  touchDelta = 0;
  onTouchStart(e: TouchEvent) {
    this.lastTouchY = e.touches[0].clientY;
  }
  onTouchMove(e: TouchEvent) {
    const delta = (e.touches[0].clientY - this.lastTouchY) * -0.1;
    this.touchAcceleration = delta;
    this.touchDelta = delta;
  }
  onTouchEnd(e: TouchEvent) {
    const delta = (e.changedTouches[0].clientY - this.lastTouchY) * -1;

    const halflife = Math.min(Math.abs(delta) / window.innerHeight, 1);

    if (delta < 0) this.touchAcceleration = Math.min(delta, 10) * halflife;
    if (delta > 0) this.touchAcceleration = Math.max(delta, -10) * halflife;
    this.touchDelta = delta;
  }
  updateTouchMove() {
    if (Math.abs(this.touchAcceleration) < 0.1) return;
    this.current += this.touchAcceleration;
    if (this.current < 0) this.current = this.total;
    if (this.current > this.total) this.current = 0;

    this.touchAcceleration *= 0.95;
  }
}
