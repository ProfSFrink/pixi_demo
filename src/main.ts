/**
 * TITLE: PIXI Parallax Scrolling Background
 * AUTHOR: Steven Partlow
 * DATE: 21-08-2024
 * URL: https://github.com/ProfSFrink/pixi_js_repos/tree/master/pixi_background
 * ASSETS: Assets provided by Vnitti - https://vnitti.itch.io/
 */

import "./css/style.css";
import { Application, Assets, Sprite, TilingSprite } from "pixi.js";
import { loadAssets } from "./load";
import { gameBackground } from "./gameBackground";

// Setup pixi application & background sprite object

const app = new Application();

// Add support for PIXI dev tools
(globalThis as any).__PIXI_APP__ = app;

/**
 * Create empty background sprite objects
 */
const background: gameBackground = {
  sky: new Sprite(),
  bkg: new TilingSprite(),
  mountains: new TilingSprite(),
  fore_3: new TilingSprite(),
  fore_2: new TilingSprite(),
  fore_1: new TilingSprite(),
};

/**
 * Create empty lonely cloud objects
 */
const lonelyClouds: lonelyCloud = {
  one: new Sprite(),
  two: new Sprite(),
  three: new Sprite(),
  four: new Sprite(),
};

/**
 * Initialize the app with a white background and resize it to the window size
 */
async function init() {
  // Initialize the app with a white background and resize it to the window size
  await app.init({ background: "#ffffff", resizeTo: window });

  // Append the canvas to the document body
  document.body.appendChild(app.canvas);

  load();
}

/**
 * Load the assets and create the background sprite objects
 */
async function load(): Promise<void> {
  await Assets.init({ manifest: loadAssets.manifest });

  // Background load the asset for our background
  Assets.backgroundLoadBundle(["background"]);

  // Get the assets from the background bundle
  const backgroundAssets = await Assets.loadBundle("background");

  // Create a sprite from the sky asset
  background.sky = new Sprite({
    texture: backgroundAssets.sky,
    label: "sky",
  });

  // Create a sprite from the clouds background asset
  background.bkg = new TilingSprite({
    texture: backgroundAssets.clouds_background,
    width: backgroundAssets.clouds_background.width,
    height: backgroundAssets.clouds_background.height,
    anchor: { x: 0, y: 1 },
    scale: { x: 1, y: 1.5 },
    label: "clouds_background",
  });

  // Create a sprite from the glacial mountains asset
  background.mountains = new TilingSprite({
    texture: backgroundAssets.glacial_mountains,
    width: backgroundAssets.glacial_mountains.width,
    height: backgroundAssets.glacial_mountains.height,
    anchor: { x: 0, y: 1 },
    scale: { x: 1.5, y: 2 },
    label: "glacial_mountains",
  });

  // Create a sprite using the clouds foreground 1 asset
  background.fore_3 = new TilingSprite({
    texture: backgroundAssets.clouds_fore_3,
    width: backgroundAssets.clouds_fore_3.width,
    height: backgroundAssets.clouds_fore_3.height,
    anchor: { x: 0, y: 1 },
    scale: { x: 1, y: 2.9 },
    label: "clouds_fore_3",
  });

  // Create a sprite using the clouds foreground 2 asset
  background.fore_2 = new TilingSprite({
    texture: backgroundAssets.clouds_fore_2,
    width: backgroundAssets.clouds_fore_2.width,
    height: backgroundAssets.clouds_fore_2.height,
    anchor: { x: 0, y: 1 },
    scale: { x: 1, y: 2 },
    label: "clouds_fore_2",
  });

  // Create a sprite using the clouds foreground 3 asset
  background.fore_1 = new TilingSprite({
    texture: backgroundAssets.clouds_fore_1,
    width: backgroundAssets.clouds_fore_1.width,
    height: backgroundAssets.clouds_fore_1.height,
    anchor: { x: 0, y: 1 },
    scale: { x: 1, y: 1.9 },
    label: "clouds_fore_1",
  });

  // Create a collection of lonely cloud sprites
  lonelyClouds.one = new Sprite({
    texture: backgroundAssets.cloud_lonely,
    anchor: 0.5,
    scale: 3,
    label: "cloud_lonely_1",
  });

  lonelyClouds.two = new Sprite({
    texture: backgroundAssets.cloud_lonely,
    anchor: 0.5,
    scale: { x: -3, y: 3 },
    label: "cloud_lonely_2",
  });

  lonelyClouds.three = new Sprite({
    texture: backgroundAssets.cloud_lonely,
    anchor: 0.5,
    scale: { x: 2, y: 2 },
    label: "cloud_lonely_3",
  });

  lonelyClouds.four = new Sprite({
    texture: backgroundAssets.cloud_lonely,
    anchor: 0.5,
    scale: { x: -2, y: 2 },
    label: "cloud_lonely_4",
  });

  create();
}

/**
 * Change the size of the sprites to match the display
 * and add them to the view.
 */
function create(): void {
  // Create sprites for the background
  app.stage.addChild(background.sky);
  app.stage.addChild(background.bkg);
  app.stage.addChild(background.mountains);
  app.stage.addChild(background.fore_3);
  app.stage.addChild(background.fore_2);
  app.stage.addChild(background.fore_1);

  // Create sprites for individual clouds
  app.stage.addChild(lonelyClouds.one);
  app.stage.addChild(lonelyClouds.two);
  app.stage.addChild(lonelyClouds.three);
  app.stage.addChild(lonelyClouds.four);

  // Add parallax scrolling to the background and foreground clouds
  app.ticker.add(() => {
    background.bkg.tilePosition.x -= 0.25;
    background.fore_3.tilePosition.x += 0.4;
    background.fore_2.tilePosition.x -= 0.5;
    background.fore_1.tilePosition.x += 0.25;

    lonelyClouds.one.position.x += 0.1;
    lonelyClouds.two.position.x -= 0.05;
    lonelyClouds.three.position.x += 0.025;
    lonelyClouds.three.position.y += 0.005;
    lonelyClouds.four.position.x -= 0.35;
  });

  resize();
}

/**
 * Resize the app to the window size
 */
function resize(): void {
  const defaultX = 0;
  const yOffset = 10;

  // Anchor background sprites to the bottom of the screen
  background.sky.width = app.screen.width;
  background.sky.height = app.screen.height;

  background.bkg.width = app.screen.width;
  background.bkg.x = defaultX;
  background.bkg.y = app.screen.height - 50;

  background.mountains.width = app.screen.width;
  background.mountains.x = defaultX;
  background.mountains.y = app.screen.height - yOffset;

  background.fore_3.width = app.screen.width;
  background.fore_3.x = defaultX;
  background.fore_3.y = app.screen.height + yOffset;

  background.fore_2.width = app.screen.width;
  background.fore_2.x = defaultX;
  background.fore_2.y = app.screen.height - yOffset;

  background.fore_1.width = app.screen.width;
  background.fore_1.x = defaultX;
  background.fore_1.y = app.screen.height;

  // Position individual clouds
  lonelyClouds.one.position.set(
    app.screen.width / 8,
    background.mountains.y -
      background.mountains.height -
      app.screen.height * 0.145
  );

  lonelyClouds.two.position.set(
    app.screen.width - app.screen.width * 0.2,
    background.mountains.y -
      background.mountains.height -
      app.screen.height * 0.495
  );

  lonelyClouds.three.position.set(
    app.screen.width * 0.05,
    background.mountains.y -
      background.mountains.height -
      app.screen.height * 0.365
  );

  lonelyClouds.four.position.set(
    app.screen.width - app.screen.width * 0.025,
    background.mountains.y -
      background.mountains.height -
      app.screen.height * 0.075
  );
}

// Attach resize function to window resize event
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", resize);

init();

// Type for individual lonely cloud sprites
type lonelyCloud = {
  one: Sprite;
  two: Sprite;
  three: Sprite;
  four: Sprite;
};
