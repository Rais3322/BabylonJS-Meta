import { EngineFactory } from "@babylonjs/core";
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

  const world = engine.gameInstance.createDefaultWorld();
  const level = world.createLevel();
})
