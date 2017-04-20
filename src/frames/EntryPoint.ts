import {Actions, AppAction} from "../actionMap";
import {AppFrame, Frames} from "../frameMap";

import {IFrame} from "larynx-sdk/dist/definitions/interfaces";
import {AppContext} from "../index";

export default class IndexFrame extends AppContext implements IFrame {
    transitions = {
        actions: [
            {
                action: Actions.YesAction,
                handler: Frames.Start
            }
        ],
        unhandled: {
            handler: {
                name: "EntryPoint_Unhandled"
            }
        }
    };
    sessionEnded = function () {
        return new Promise(resolve => {
            resolve();
        });
    };
}
