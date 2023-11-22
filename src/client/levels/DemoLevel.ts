import { HemisphericLight, MeshBuilder, Scene, SceneLoader, TransformNode, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { LevelController } from "client/controllers/LevelController";
import { PlayerController } from "client/controllers/PlayerController";
import { GameEngine } from "client/engine/GameEngine";
import { Player } from "client/entities/Player";


export class Level {
  private gameEngine: GameEngine;

  public scene: Scene;
  public playerController: PlayerController;
  public levelController: LevelController;

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine;

    this.scene = new Scene(this.gameEngine.renderEngine);
    this.createScene();
    this.loadAssets();

    this.levelController = new LevelController(this);

    this.playerController = new PlayerController(this);

    // TODO: Player Spawner
    const player = new Player(this.playerController);
  }

  public createScene() {
    Inspector.Show(this.scene, {});

    const framesPerSecond = 60;
    const gravity = -9.81;
    this.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
    this.scene.collisionsEnabled = true;

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), this.scene);
    light.intensity = 0.7;

    const ball = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 1000, height: 1000 },
      this.scene
    );
    ground.checkCollisions = true;
    ground.position = new Vector3(0, -1, 0);
  }

  public loadAssets() {
    const transformNode = new TransformNode("RosAtom_Full");
    const RosAtom_Full = SceneLoader.ImportMesh(
      "",
      "./models/",
      "RosAtom_Full.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        // meshes.forEach((mesh) => {
        //   mesh.checkCollisions = true;
        //   mesh.position.y += 5.6;
        //   // mesh.parent = transformNode;
        // });
        // transformNodes.forEach(trans => {
        //   trans.position.y += 5.6;
        // });
        // console.log(this.scene.rootNodes);

        // перемещение дочерних не совсем адекватное
        const root = this.scene.getNodeByName('__root__');
        if (root) {
          root.parent = transformNode;
          root.name = 'RosAtom_Full_root';
        }

        transformNode.position.set(0, 10.6, 0);
      },
      undefined,
      undefined,
      undefined,
      "RosAtom_Full"
    );
  }
}