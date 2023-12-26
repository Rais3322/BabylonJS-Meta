import { Scene, SceneOptions } from "@babylonjs/core";
import { Actor } from "../GameFramework";
import { World } from "./World";

export class Level {
  URL: string;
  netURL: string | undefined = undefined;
  scene: Scene | null = null;
  actors: Actor[];

  requiredAssets = [];

  private owningWorld: World;

  constructor(owningWorld: World, scene?: Scene) {
    this.URL = String(new Date().getTime());
    this.actors = [];
    this.owningWorld = owningWorld;

    if (scene) {
      this.scene = scene;
    }
  }

  createScene(sceneOptions?: SceneOptions) {
    this.scene = new Scene(this.owningWorld.getEngine(), sceneOptions);
  }

  getWorld() { return this.owningWorld }
}