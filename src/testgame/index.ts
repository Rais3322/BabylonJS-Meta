import {
  EngineFactory,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
} from "@babylonjs/core";
import { GameEngine, GameEngineOptions } from "client/engine/classes/engine/GameEngine";
import { Level } from "client/engine/classes/engine/Level";
import { World } from "client/engine/classes/engine/World";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

EngineFactory.CreateAsync(canvas, {
  adaptToDeviceRatio: true,
  antialias: true,
}).then(renderEngine => {
  const engine = new GameEngine(renderEngine, GameEngineOptions.clientOptions(canvas));

  engine.init();

  // const world = engine.getWorld();
  // if (world) {
  //   // перед init у world могут быть переопределение свойств-классов
  //   world.init();

  //   const level = world.createLevel();
  // }

  // entities
  const world = engine.gameInstance.createDefaultWorld();
  const level = world.createLevel();


  // content
  const ball = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, level.scene);
  ball.receiveShadows = true;
  ball.position.z = -32;

  const light = new HemisphericLight("HemisphericLight", new Vector3(1, 1, 0), level.scene);
  light.intensity = 0.7;

  const camera = new FreeCamera('FreeCamera', new Vector3(108, 30, -35), level.scene);
  camera.setTarget(new Vector3(0, 0, 0));
  camera.attachControl();


  // run 
  world.loadAndChangeLevel(level);
  engine.start();
})
