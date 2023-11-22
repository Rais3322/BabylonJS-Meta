import { Scene } from "@babylonjs/core";
import { Level } from "client/levels/DemoLevel";

export class PlayerController {
  level: Level;

  constructor(level: Level) {
    this.level = level;
  }
}