import {CreatesFrame, Frames as LarynxFrames} from "larynx-sdk/dist/definitions/interfaces";
import {EventContainer} from "larynx-sdk/dist/platforms/implementations";
import {Instance} from "./index";

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
        implementation: require("./frames/EntryPoint"),
        targets: [this.Start]
    },
    "NumberGuess": {
        name: "NumberGuess",
        implementation: require("./frames/NumberGuess"),
        targets: [this.NumberGuess]
    },
    "Start": {
        name: "Start",
        implementation: require("./frames/start"),
        targets: [this.NumberGuess]
    },
    "GameFinished": {
        name: "EndGame",
        implementation: require("./frames/GameFinished"),
        targets: []
    },
    "Help": {
        name: "Help",
        implementation: require("./frames/Help"),
        targets: [this.Start, this.EndGame, this.NumberGuess]
    }
};

/**
 * Create event containers for each frame
 */
for (let frameKey in Frames) {
    class T implements EventContainer {
        frameId = {name: Frames[frameKey].name};
        targets = Frames[frameKey].targets;
        impl = Frames[frameKey].implementation;
    }
    Instance.Register(new T());
}