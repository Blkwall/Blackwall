import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PlaneGeometry,
  Texture,
  Vector2,
  Vector3,
  VideoTexture,
} from "three";

export class SceneObject {
  texture: Texture | VideoTexture;
  size: number;
  ratio: number;
  layers: number;
  object: Group;
  gap: number;
  direction: Vector3 = new Vector3(0, 0, 0);
  alpha: number | null = null;
  constructor(
    texture: Texture | VideoTexture,
    size: number,
    ratio: number,
    layers: number,
    gap: number
  ) {
    this.gap = gap;
    this.texture = texture;
    this.size = size;
    this.ratio = ratio;
    this.layers = layers;
    this.object = this.drawOject();
  }

  makeMaterial(texture: Texture, normalMode: boolean) {
    return new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
      transparent: true,
      color: 0xffffff,
      blending: normalMode ? NormalBlending : AdditiveBlending,
    });
  }

  drawOject() {
    const group = new Group();
    const geometry = new PlaneGeometry(this.size, this.size * this.ratio);

    for (let i = 0; i < this.layers; i++) {
      const material = this.makeMaterial(this.texture, i === this.layers - 1);
      const mesh = new Mesh(geometry, material);
      mesh.position.z -= this.gap * i;
      group.add(mesh);
    }
    return group;
  }

  update(progress: number, mousePosition: Vector2) {
    const mousePos3d = new Vector3(
      mousePosition.x * -1,
      mousePosition.y * -1,
      0
    );
    const lookAt = this.direction.clone().add(mousePos3d.multiplyScalar(0.1));
    this.object.lookAt(lookAt);
  }

  public static isVideoTexture(texture: Texture | VideoTexture) {
    return (texture as VideoTexture).isVideoTexture || false;
  }
}
const wrap = (num: number, min: number, max: number): number =>
  ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;
