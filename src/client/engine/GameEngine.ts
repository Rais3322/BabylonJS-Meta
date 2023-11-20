import {
  Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder,
  Mesh
} from "@babylonjs/core";

export class GameEngine {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;


  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.engine = new Engine(this.canvas, true, {
      adaptToDeviceRatio: true,
      antialias: true,
    });

    this.scene = new Scene(this.engine);

    this.init();
  }

  private init() {
    const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
    camera.attachControl(this.canvas, true);
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);
    const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);

    this.render();
  }

  private render() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}
