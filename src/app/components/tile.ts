import * as PIXI from "pixi.js";
import { default as data } from "./../data";

export class Tile extends PIXI.Container {

    public id: number;
    private title: string;

    private tileWidth: number;
    private tileHeight: number;
    private border: PIXI.Graphics;
    private sprite: PIXI.Sprite;
    private reelId: number;
    private reelPosition: number;

    constructor(width: number, height: number, reelId: number, reelPosition: number) {
        super();

        // store width and height
        this.tileWidth = width;
        this.tileHeight = height;
        this.reelId = reelId;
        this.reelPosition = reelPosition;

        // add border
        this.border = new PIXI.Graphics();
        this.border.lineStyle(1, 0xaa0000);
        this.border.beginFill(0xaa0000, 0.2);
        this.border.drawRect(0, 0, width, height);
        this.addChild(this.border);

        // add sprite
        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set(0.4, 0.4);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(width * 0.5, height * 0.5);
        this.addChild(this.sprite);
        this.swap();
    }

    public swap(): void {
        // get a symbol id based on the reelid and reelposition,
        // predefined order in data sheet
        this.id = data.reelorders[this.reelId][this.reelPosition];

        // verify if already have texture
        if (data.symbols[this.id].texture === null) {
            data.symbols[this.id].texture = PIXI.Texture.fromImage(data.symbols[this.id].filename);
        }
        this.title = data.symbols[this.id].title;

        // set the data
        this.sprite.texture = data.symbols[this.id].texture;
    }
}
