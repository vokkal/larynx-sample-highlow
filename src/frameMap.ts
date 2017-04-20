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
    "EntryPoint_Help": {
        name: "EntryPoint_Help",
        implementation: require("./frames/EntryPoint_Help"),
        targets: [this.Start]
    },
    "Start": {
        name: "Start",
        implementation: require("./frames/start"),
        targets: []
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