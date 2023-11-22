import { Level } from "client/levels/DemoLevel";

// логика одного уровня
export class LevelController {
  level: Level;

  constructor(level: Level) {
    this.level = level;
  }
}