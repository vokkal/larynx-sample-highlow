import {Actions, AppAction} from "../actionMap";
import {AppFrame, Frames} from "../frameMap";
import {IFrame} from "larynx-sdk/dist/definitions/interfaces";
import {AppContext, TemplateModel} from "../index";

export default class GameFinished extends AppContext implements IFrame {
    prompts = function () {
        let guessNum = this.slots.number.value;

        let speech = `${guessNum} is correct! Would you like to play a new game?`;
        let reprompt = "Say yes to start a new game, or no to end the game.";

        let response = {
            speech: {
                ssml: `<speak>${speech}</speak>`
            },
            reprompt: {
                ssml: `<speak>${reprompt}</speak>`
            },
            card: {
                title: "High-Low Guessing Game",
                text: `${guessNum} is correct!`
            }
        };

        return new TemplateModel("standard", response);
    };
    transitions = {
        actions: [
            {
                action: Actions.YesAction,
                handler: function () {
                    this.attributes["restarted"] = true;
                    return Frames.Start;
                }
            },
            {
                action: Actions.NoAction,
                handler: Frames.NumberGuess
            },
            {
                action: Actions.HelpAction,
                handler: Frames.Help
            }
        ],
        unhandled: {
            handler: Frames.Help
        }
    };
    sessionEnded = function () {
        return new Promise(resolve => {
            resolve();
        });
    };
}