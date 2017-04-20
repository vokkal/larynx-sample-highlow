import {LarynxInterfaces} from "larynx-sdk";
import {Instance} from "./index";

/**
 * Extend the built in actions interface to include aliases
 */
export declare interface AppAction extends LarynxInterfaces.Actions {
    name: string;
    aliases: Array<string>;
}

/**
 * Action map.
 */
export const Actions: { [key: string]: AppAction } = {
    "YesAction": {
        name: "YesAction",
        aliases: ["AMAZON.YesIntent"]
    },
    "NoAction": {
        name: "NoAction",
        aliases: ["AMAZON.NoIntent"]
    },
    "HelpAction": {
        name: "HelpAction",
        aliases: ["AMAZON.HelpIntent"]
    },
    "StopAction": {
        name: "StopAction",
        aliases: ["AMAZON.StopIntent"]
    },
    "CancelAction": {
        name: "CancelAction",
        aliases: ["AMAZON.CancelIntent"]
    },
    "NumberGuessAction": {
        name: "NumberGuessAction",
        aliases: ["NumberGuessIntent"]
        // "slots": [{"name": "number", "type": "AMAZON.NUMBER"}]
    }

};

/**
 * Register each alias for SDK usage
 */
for (let key in Actions) {
    for (let aliasIndex in Actions[key].aliases) {
        let alias = Actions[key].aliases[aliasIndex];
        if (Instance.Actions[alias]) {
            throw new Error(`Alias '${alias}' for action '${key}' is already defined!`);
        } else {
            Instance.Actions[alias] = Actions[key];
        }
    }
}