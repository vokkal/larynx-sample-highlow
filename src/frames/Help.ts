import {Actions, AppAction} from "../actionMap";
import {AppFrame, Frames} from "../frameMap";
import {IFrame} from "larynx-sdk/dist/definitions/interfaces";
import {AppContext, TemplateModel} from "../base";

export default class Help extends AppContext implements IFrame {
    prompts = function () {
        let response = {
            speech: {
                ssml: "<speak>In this game you try to guess a secret number between one and one hundred. Try to guess what it is by saying a number!</speak>"
            },
            reprompt: {
                ssml: "<speak>Try saying a number between one and one hundred.</speak>"
            },
            card: {
                title: "High-Low Guessing Game - Help",
                text: "This is a simple guessing game. Try saying a number between 1 and 100."
            }
        };

        return new TemplateModel("standard", response);
    };
    transitions = {
        actions: [
            {
                action: Actions.NumberGuessAction,
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