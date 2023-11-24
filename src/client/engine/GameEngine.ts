import {
  Engine,
} from "@babylonjs/core";
import { Network } from "client/controllers/Network";
import { Level } from "client/levels/DemoLevel";

export class GameEngine {
  canvas: HTMLCanvasElement;
  renderEngine: Engine;
  currentLevel: Level | null = null;
  client: Network;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderEngine = new Engine(this.canvas, true, {
      adaptToDeviceRatio: true,
      antialias: true,
    });

    this.init();

    // create colyseus client
    this.client = new Network(__WS_PORT__);

    this.createScene();
  }

  private init() {
    window.addEventListener('resize', () => {
      this.renderEngine.resize();
    });
  }

  private createScene() {
    const demoLevel = new Level(this);
    this.currentLevel = demoLevel;

    demoLevel.scene.onPointerDown = (evt) => {
      // среднее колесо мыши
      if (evt.button === 1 && this.renderEngine.isPointerLock) this.renderEngine.exitPointerlock();
      if (evt.button === 1 && !this.renderEngine.isPointerLock) this.renderEngine.enterPointerlock();
    };

    this.render();
  }

  private render() {
    let divFps = document.getElementById("fps");

    this.renderEngine.runRenderLoop(() => {
      if (this.currentLevel) {
        this.currentLevel.scene.render();
      }
      if (divFps) {
        divFps.innerHTML = this.renderEngine.getFps().toFixed() + " fps";
      }
    });
  }
}
