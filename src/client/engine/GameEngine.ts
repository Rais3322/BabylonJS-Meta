import {
  Engine,
} from "@babylonjs/core";
import { Level } from "client/levels/DemoLevel";

export class GameEngine {
  canvas: HTMLCanvasElement;
  renderEngine: Engine;
  currentLevel: Level | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderEngine = new Engine(this.canvas, true, {
      adaptToDeviceRatio: true,
      antialias: true,
    });

    this.init();
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
    this.renderEngine.runRenderLoop(() => {
      if (this.currentLevel) {
        this.currentLevel.scene.render();
      }
    });
  }
}
