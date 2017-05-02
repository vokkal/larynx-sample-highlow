import {CreatesFrame, Frames as LarynxFrames} from "larynx-sdk/dist/definitions/interfaces";
import {EventContainer} from "larynx-sdk/dist/platforms/implementations";
import {Instance} from "./index";
import IndexFrame from "./frames/EntryPoint";
import NumberGuess from "./frames/NumberGuess";
import Start from "./frames/start";
import GameFinished from "./frames/GameFinished";
import Help from "./frames/Help";

/**
 * Extend the built in frame interface to include implementation and targets
 */
export declare interface AppFrame extends LarynxFrames {
    name: string;
    implementation: CreatesFrame;
    targets: Array<AppFrame>;
}

export const Frames: { [key: string]: AppFrame } = {
    "EntryPoint": {
        name: "EntryPoint",
        implementation: IndexFrame,
        targets: [this.Start]
    },
    "NumberGuess": {
        name: "NumberGuess",
        implementation: NumberGuess,
        targets: [this.NumberGuess]
    },
    "Start": {
        name: "Start",
        implementation: Start,
        targets: [this.NumberGuess]
    },
    "GameFinished": {
        name: "EndGame",
        implementation: GameFinished,
        targets: []
    },
    "Help": {
        name: "Help",
        implementation: Help,
        targets: [this.Start, this.GameFinished, this.NumberGuess]
    }
};

/**
 * Create event containers for each frame
 */

export function RegisterFrames() {
    for (let frameKey in Frames) {
        class T implements EventContainer {
            frameId = {name: Frames[frameKey].name};
            targets = Frames[frameKey].targets;
            impl = Frames[frameKey].implementation;
        }
        Instance.Register(new T());
    }
}