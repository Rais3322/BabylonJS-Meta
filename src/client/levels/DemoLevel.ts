import { ShadowGenerator, DirectionalLight, CubeTexture, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, TransformNode, Vector3 } from "@babylonjs/core";
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

    // ambient background light
    const light = new HemisphericLight("HemisphericLight", new Vector3(1, 1, 0), this.scene);
    light.intensity = 0.7;

    // const dirlight = new DirectionalLight("dirlight", new Vector3(0, -1, 1), this.scene);

    // const shadowGenerator = new ShadowGenerator(1024, dirlight);

    const ball = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 1000, height: 1000 },
      this.scene
    );
    ground.checkCollisions = true;
    ground.position = new Vector3(0, -1, 0);
    ground.receiveShadows = true;
    const groundMaterial = new StandardMaterial("backgroundMaterial", this.scene);
    groundMaterial.diffuseTexture = new Texture("textures/env/grass.jpg", this.scene);
    ground.material = groundMaterial;
    // groundMaterial.diffuseTexture.scale(1);
    // @ts-ignore
    groundMaterial.diffuseTexture.uScale = 1000;
    // @ts-ignore
    groundMaterial.diffuseTexture.vScale = 1000;

    const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.scene);
    var skyboxMaterial = new StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("textures/skybox/skybox", this.scene, undefined, undefined,);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    skyboxMaterial.disableLighting = true; // remove all light reflections on our box
    skybox.infiniteDistance = true; // follow our camera's position
  }

  public async loadAssets() {
    const transformNode = new TransformNode("RosAtom_Full");
    const RosAtom_Full = SceneLoader.ImportMesh(
      "",
      "./models/",
      "RosAtom_Full.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          // mesh.checkCollisions = true;
          // mesh.position.y += 5.6;
          // mesh.parent = transformNode;
          mesh.receiveShadows = true;
        });
        // transformNodes.forEach(trans => {
        //   trans.position.y += 5.6;
        // });
        // console.log(this.scene.rootNodes);

        const root = this.scene.getNodeByName('__root__');
        if (root) {
          root.parent = transformNode;
          root.name = 'RosAtom_Full_root';
        }

        transformNode.position.set(0, 10.6, 0);
      },
    );

    // const nuclear = await SceneLoader.ImportMeshAsync(
    //   "",
    //   "./models/",
    //   "Ветер.glb",
    //   this.scene,
    // ).then(result => {
    //   console.log(result);
    // }).catch(error => {
    //   console.log(error);
    // })
  }
}