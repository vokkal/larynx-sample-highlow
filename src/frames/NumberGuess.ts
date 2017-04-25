import {Actions, AppAction} from "../actionMap";
import {AppFrame, Frames} from "../frameMap";
import {IFrame} from "larynx-sdk/dist/definitions/interfaces";
import {AppContext, TemplateModel} from "../index";
import {RedirectResponse} from "larynx-sdk/dist/platforms/common/common";

export default class NumberGuessFrame extends AppContext implements IFrame {
    pre = function () {
        return new Promise(resolve => {
            let numSlot = this.slots.number;
            let guessNum = parseInt(numSlot ? numSlot.value : undefined);
            let targetNum = this.attributes["guessNumber"];

            // Guessed correctly, end the game.
            if (guessNum === targetNum) {
                resolve(new RedirectResponse(true, "GameFinished"));
            } else {
                resolve(new RedirectResponse(false));
            }
        });
    };
    prompts = function () {
        let numSlot = this.slots.number;
        let guessNum = parseInt(numSlot ? numSlot.value : undefined);
        let targetNum = this.attributes["guessNumber"];

        let speech = "";
        let reprompt = "";

        if (guessNum) {
            console.log(`target: ${targetNum}. Guess: ${guessNum}`);
        } else {
            console.log(`target: ${targetNum}. No Guess found.`);
        }

        if (guessNum > targetNum) {
            speech = `${guessNum} is too high!`;
            reprompt = "Try saying a lower number.";
        } else if (guessNum < targetNum) {
            speech = `${guessNum} is too low!`;
            reprompt = "Try saying a higher number.";
        } else {
            speech = `I'm sorry, I didn't get that. Try saying a number.`;
            reprompt = "Try saying a number between one and one hundred.";
        }

        let response = {
            speech: {
                ssml: `<speak>${speech} Try again.</speak>`
            },
            reprompt: {
                ssml: `<speak>${reprompt}</speak>`
            },
            card: {
                title: "High-Low Guessing Game",
                text: `${speech} Try saying a number between 1 and 100.`
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