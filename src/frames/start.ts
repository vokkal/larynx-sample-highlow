import {AlexaService, CommonClasses, LarynxClasses, LarynxInterfaces} from "larynx-sdk";
import {AppContext, Instance, TemplateModel} from "../index";
import {Actions, AppAction} from "../actionMap";
import {AppFrame, Frames} from "../frameMap";
import {RedirectResponse} from "larynx-sdk/dist/platforms/common/common";

export default class StartFrame extends AppContext implements LarynxInterfaces.IFrame {
    pre = function () {
        return new Promise(resolve => {
            // Starting a new game, set the guess target
            this.attributes["guessNumber"] = Math.floor(Math.random() * 101);

            resolve(new RedirectResponse(false));
        });
    };
    prompts = function () {
        let welcome = "Welcome to High Low Guessing Game.";
        let response = {
            speech: {
                ssml: `<speak>${this.attributes["restarted"] ? "" : welcome} I'm thinking of a number between one and one hundred. Try to guess what it is!</speak>`
            },
            reprompt: {
                ssml: "<speak>Try saying a number.</speak>"
            },
            card: {
                title: "High-Low Guessing Game",
                text: "The game has started. Try saying a number between 1 and 100."
            }
        };

        return new TemplateModel("standard", response);
    };
    transitions = {
        actions: [
            {
                action: Actions.LaunchAction,
                handler: Frames.Start
            },
            {
                action: Actions.NumberGuessAction,
                handler: Frames.NumberGuess
            },
            {
                action: Actions.HelpAction,
                handler: function () {
                    return Frames.Help;
                }
            }
        ],
        unhandled: {
            handler: Frames.Start
        }
    };
    sessionEnded = function () {
        return new Promise(resolve => {
            resolve();
        });
    };
}
