import * as PIXI from "pixi.js";
import { Machine } from "../components/machine";
import { Scene } from "../engine/scene";

export class GameScene extends Scene {

    private readonly TEXT_STYLE: PIXI.TextStyle = new PIXI.TextStyle({
        fontSize: 36,
        fill: 0xffffff,
        stroke: 0x000000,
        strokeThickness: 5,
        align: "center",
    });

    private machine: Machine;
    private btnSpin: PIXI.Sprite;

    private firstReelTop: PIXI.Text;
    private firstReelTopValue: string;
    private secondReelTop: PIXI.Text;
    private secondReelTopValue: string;
    private thirdReelTop: PIXI.Text;
    private thirdReelTopValue: string;
    private resultText: PIXI.Text;

    constructor(renderer: PIXI.SystemRenderer) {
        super(renderer);

        // adds machine
        this.machine = new Machine(1340, 880, 3);
        this.machine.position.set(350, 180);
        this.addChild(this.machine);

        // adds play button for spinning the reels
        this.btnSpin = new PIXI.Sprite ( PIXI.Texture.fromImage("../assets/images/playbutton.png"));
        this.btnSpin.position.set(880, 1150);
        this.btnSpin.scale.x = 0.8;
        this.btnSpin.scale.y = 0.8;
        this.btnSpin.interactive = true;
        this.btnSpin.buttonMode = true;
        this.btnSpin.on("pointerdown", this.spin.bind(this));
        this.addChild(this.btnSpin);

        // adds Result text
        this.resultText = new PIXI.Text("TOP ROW RESULTS:", this.TEXT_STYLE);
        this.resultText.anchor.set(0.5, 0.5);
        this.resultText.position.set(1020, 1335);
        this.addChild(this.resultText);

        // adds first top row value text
        this.firstReelTop = new PIXI.Text("", this.TEXT_STYLE);
        this.firstReelTop.anchor.set(0.5, 0.5);
        this.firstReelTop.position.set(790, 1435);
        this.addChild(this.firstReelTop);
        this.firsttopvalue = "Nine" ;

        // adds second top row value text
        this.secondReelTop = new PIXI.Text("", this.TEXT_STYLE);
        this.secondReelTop.anchor.set(0.5, 0.5);
        this.secondReelTop.position.set(1020, 1435);
        this.addChild(this.secondReelTop);
        this.secondtopvalue = "King";

        // adds bet value text
        this.thirdReelTop = new PIXI.Text("", this.TEXT_STYLE);
        this.thirdReelTop.anchor.set(0.5, 0.5);
        this.thirdReelTop.position.set(1250, 1435);
        this.addChild(this.thirdReelTop);
        this.thirdtopvalue = "Ten";
    }

    public update(delta: number): void {
        if (this.machine) {
            this.machine.update(delta);
        }
    }

    protected preload(): void {
        // TODO
    }

    protected create(): void {
        const template: PIXI.Sprite = PIXI.Sprite.fromImage("assets/images/stars.png");
        template.width = Scene.width;
        template.height = Scene.height;
        template.alpha = 0.2;
        this.addChildAt(template, 0);
    }

    private spin(): void {
        // tslint:disable-next-line:no-console
        console.log("spin button clicked.");
        this.machine.spinReels();

    }

    private get firsttopvalue(): string {
        return this.firstReelTopValue;
    }

    private set firsttopvalue(value: string) {
        this.firstReelTopValue = value;
        this.firstReelTop.text = this.firstReelTopValue;
    }

    private get secondtopvalue(): string {
        return this.secondReelTopValue;
    }

    private set secondtopvalue(value: string) {
        this.secondReelTopValue = value;
        this.secondReelTop.text = this.secondReelTopValue;
    }

    private get thirdtopvalue(): string {
        return this.thirdReelTopValue;
    }

    private set thirdtopvalue(value: string) {
        this.thirdReelTopValue = value;
        this.thirdReelTop.text = this.thirdReelTopValue;
    }
}
