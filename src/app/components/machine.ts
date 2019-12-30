import * as PIXI from "pixi.js";
import { default as data } from "./../data";
import { Reel } from "./reel";

export class Machine extends PIXI.Container {

    private reels: Reel[];
    private currentReel: number;

    constructor(width: number, height: number, numberOfReels: number = 3) {
        super();

        this.reels = [];

        // draws a border
        const border: PIXI.Graphics = new PIXI.Graphics();
        border.lineStyle(10, 0xffffff, 1);

        // adds reels
        const slicedWidth: number = width / numberOfReels;
        for (let i: number = 0; i < numberOfReels; i++) {
            const reel: Reel = new Reel(slicedWidth, height, i);
            reel.position.set(slicedWidth * i, 0);
            this.addChild(reel);
            this.reels.push(reel);
            border.drawRect(slicedWidth * i, 0, slicedWidth, height);
            reel.on("spincomplete", this.onReelSpinComplete.bind(this));
        }
        this.addChild(border);

    }

    public spinReels(): void {
        this.currentReel = 0;
        let timeout: number = 0;
        for (const reel of this.reels) {
            setTimeout(reel.spin.bind(reel), timeout);
            timeout += 300;
        }
        setTimeout(this.stopReels.bind(this), 1500);
    }

    public stopReels(): void {

        this.reels[0].stop();
    }

    public update(delta: number): void {
        for (const reel of this.reels) {
            reel.update(delta);
        }
    }

    private onReelSpinComplete(event: Event): void {
        this.currentReel++;
        if (this.currentReel < this.reels.length) {
            // stop the next
            this.reels[this.currentReel].stop();
        } else {
            // all reels are stopped
            this.analyseResult();
        }
    }

    private analyseResult(): void {
        // tslint:disable-next-line:no-console
        console.log("analyse result");
        // tslint:disable-next-line:no-console
        console.log(this.reels);
    }
}
