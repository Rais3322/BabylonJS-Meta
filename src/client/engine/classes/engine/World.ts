import { AssetsManager, Scene, SceneOptions } from "@babylonjs/core";
import { Actor } from "../GameFramework";
import { GameInstance } from "./GameInstance";
import { Level } from "./Level";
import { IWorldSettings, WorldSettings } from "./WorldSettings";

export class World {
  URL: string;
  netURL: string | undefined = undefined;

  levels: Level[] = [];
  createdLevels: Level[] = [];
  // loadingLevel: Level | null = null; // загрузочный уровень

  worldSettings: WorldSettings;
  assetsManager: AssetsManager; // TODO протестить
  // gameState: GameState;
  // gameMode: GameMode;

  readonly persistentLevel: Level;
  readonly persistentScene: Scene;

  private owningGameInstance: GameInstance;
  private currentLevel: Level | null = null;

  constructor(gameInstance: GameInstance, worldSettings?: IWorldSettings) {
    this.URL = String(new Date().getTime());

    this.owningGameInstance = gameInstance;

    this.worldSettings = new WorldSettings();
    if (worldSettings) {
      this.worldSettings.combine(worldSettings);
    }

    this.persistentScene = new Scene(this.getEngine());
    this.persistentLevel = new Level(this, this.persistentScene);

    this.assetsManager = new AssetsManager(this.persistentScene);

    this.currentLevel = this.persistentLevel;
  }

  // init(worldSettings?: IWorldSettings) {
  //   this.worldSettings = new WorldSettings();
  //   if (worldSettings) {
  //     this.worldSettings.combine(worldSettings);
  //   }

  //   this._persistentScene = new Scene(this.getEngine());
  //   this._persistentLevel = new Level(this, this._persistentScene);

  //   this.assetsManager = new AssetsManager(this._persistentScene);

  //   this.currentLevel = this._persistentLevel;
  // }

  // onInitWorld: (() => IWorldSettings) | undefined = undefined;

  addActor(actor: Actor) {

  }

  getEngine() { return this.owningGameInstance.engineRef }

  async asyncLoadLevel() { }

  createLevel(): Level {
    const scene = this.createScene();
    const level = new Level(this, scene);
    this.addLevel(level);

    return level;
  }

  createScene() {
    // TODO SceneOptions добавить в worldSettings
    const options: SceneOptions = {
      useClonedMeshMap: true,
      useGeometryUniqueIdsMap: true,
      useMaterialMeshMap: true,
    };
    const scene = new Scene(this.getEngine(), options);
    return scene;
  }

  addLevel(level: Level) {
    this.levels.push(level);
  }

  loadLevel(level: Level) {

  }

  activateLevel(level: Level) {
    this.currentLevel = level;
  }

  loadAndActivateLevel(level: Level) {

  }

  // private createPersistentLevel(): Level {
  //   const level = new Level(this, this._persistentScene);
  //   return level;
  // }
}