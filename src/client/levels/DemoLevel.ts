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
  public shadowGenerator: ShadowGenerator | null = null;

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

    const dirlight = new DirectionalLight("dirlight", new Vector3(-1, -2, -1), this.scene);
    dirlight.position = new Vector3(20, 40, 20);

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

    const ball = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene);
    ball.receiveShadows = true;
    ball.position.z = -32;

    // shadow
    const shadowGenerator = new ShadowGenerator(2048, dirlight);
    // shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 1;
    shadowGenerator.filter = 6; // PCF
    this.shadowGenerator = shadowGenerator;
    shadowGenerator?.getShadowMap()?.renderList?.push(ball);

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
    const transformNode = new TransformNode("RosAtom");
    const RosAtom_Full = SceneLoader.ImportMesh(
      "",
      "./models/",
      "RosAtom_Full.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          mesh.receiveShadows = true;

          if (mesh.name === '__root__') {
            mesh.name = 'RosAtom_Full_root';
            mesh.parent = transformNode;
            mesh.position.set(0, 10.6, 0);
          }
        });

        // const root = this.scene.getNodeByName('__root__');
        // if (root) {
        //   root.parent = transformNode;
        //   root.name = 'RosAtom_Full_root';
        // }

        // transformNode.position.set(0, 10.6, 0);

        this.shadowGenerator?.getShadowMap()?.renderList?.push(...meshes);
      },
    );

    SceneLoader.ImportMesh(
      "",
      "./models/",
      "ядерка.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          mesh.receiveShadows = true;

          if (mesh.name === '__root__') {
            mesh.name = 'ядерка_root';
            mesh.parent = transformNode;
            mesh.position.set(-47.5, -0.5, 4.91);
            mesh.rotate(Vector3.Up(), Math.PI / 2);
          }
        });

        this.shadowGenerator?.getShadowMap()?.renderList?.push(...meshes);
      }
    );

    SceneLoader.ImportMesh(
      "",
      "./models/",
      "эко.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          mesh.receiveShadows = true;

          if (mesh.name === '__root__') {
            mesh.name = 'эко_root';
            mesh.parent = transformNode;
            mesh.position.set(-63.39, -0.47, -2.73);
          }
        });

        this.shadowGenerator?.getShadowMap()?.renderList?.push(...meshes);
      }
    );

    SceneLoader.ImportMesh(
      "",
      "./models/",
      "ветряк.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          mesh.receiveShadows = true;

          if (mesh.name === '__root__') {
            mesh.name = 'ветряк_root';
            mesh.parent = transformNode;
            mesh.position.set(-65.61, -0.43, 12.62);
          }
        });

        this.shadowGenerator?.getShadowMap()?.renderList?.push(...meshes);
      }
    );

    SceneLoader.ImportMesh(
      "",
      "./models/",
      "водород.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          mesh.receiveShadows = true;

          if (mesh.name === '__root__') {
            mesh.name = 'водород_root';
            mesh.parent = transformNode;
            mesh.position.set(-84.962, -0.72, 13.041);
          }
        });

        this.shadowGenerator?.getShadowMap()?.renderList?.push(...meshes);
      }
    );

    SceneLoader.ImportMesh(
      "",
      "./models/",
      "морской.glb",
      this.scene,
      (meshes, particleSystems, skeletons, animationGroups, transformNodes) => {
        meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          mesh.receiveShadows = true;

          if (mesh.name === '__root__') {
            mesh.name = 'морской_root';
            mesh.parent = transformNode;
            mesh.position.set(-101.69, -0.20, 13.04);
          }
        });

        this.shadowGenerator?.getShadowMap()?.renderList?.push(...meshes);
      }
    );
  }
}