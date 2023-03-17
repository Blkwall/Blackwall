import { Vector2 } from "three/src/math/Vector2";
import { ThreeInstance } from ".";

export class InputManager {
  mousePosition = new Vector2(0, 0);
  constructor(private threeInstance: ThreeInstance) {
    this.threeInstance = threeInstance;
    window.addEventListener("scroll", () => this.onScroll());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
  }

  onMouseMove(e: MouseEvent) {
    this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  scrollDirection = 0;
  lastScrollY = 0;
  onScroll() {
    if (this.lastScrollY < window.scrollY) {
      this.scrollDirection = 1;
    } else {
      this.scrollDirection = -1;
    }

    if (1 - this.threeInstance.progress >= 1 && this.scrollDirection > 0) {
      const height = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, 0);
    }

    if (1 - this.threeInstance.progress <= 0 && this.scrollDirection < 0) {
      const height = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, height);
    }
    this.lastScrollY = window.scrollY;
  }
  update() {}
}
