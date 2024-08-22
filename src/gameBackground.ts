import { Sprite, TilingSprite } from "pixi.js";

/**
 * Type for the game background
 */

export type gameBackground = {
  sky: Sprite;
  bkg: TilingSprite;
  mountains: TilingSprite;
  fore_3: TilingSprite;
  fore_2: TilingSprite;
  fore_1: TilingSprite;
};
