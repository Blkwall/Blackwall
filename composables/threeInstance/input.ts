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

  progressToCurrent(progress: number) {
    this.current = this.total * progress;
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
  lastPos = 0;
  touchAcceleration = 0;
  touchDelta = 0;

  touchStartTime: number = 0;
  touchEndTime: number = 0;

  onTouchStart(e: TouchEvent) {
    this.lastTouchY = e.touches[0].clientY;
    this.lastPos = this.current;
    this.touchAcceleration = 0;
    this.touchStartTime = Date.now();
  }

  onTouchMove(e: TouchEvent) {
    const touch = e.touches[e.touches.length - 1].clientY;

    const delta = Math.max(
      -window.innerHeight,
      Math.min(touch - this.lastTouchY, window.innerHeight)
    );
    let current = this.lastPos - delta;
    if (current < 0) current = this.total + current;
    if (current > this.total) current = current - this.total;
    this.current = current;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndTime = Date.now();
    const speed = Math.min(this.touchEndTime - this.touchStartTime, 600);
    const speedAmount = 1 - speed / 600;

    let delta = (e.changedTouches[0].clientY - this.lastTouchY) * -0.75;
    delta = delta * speedAmount;
    const halflife = Math.min(Math.abs(delta) / window.innerHeight, 1) * 1.1;
    if (delta < 0) this.touchAcceleration = Math.min(delta, 10) * halflife;
    if (delta > 0) this.touchAcceleration = Math.max(delta, -10) * halflife;
    this.touchDelta = delta;
  }

  updateTouchMove() {
    if (Math.abs(this.touchAcceleration) < 0.1) return;
    this.current += this.touchAcceleration;
    if (this.current < 0) this.current = this.total;
    if (this.current > this.total) this.current = 0;

    this.touchAcceleration *= 0.9;
  }
}
