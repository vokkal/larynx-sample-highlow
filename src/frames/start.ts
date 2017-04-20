import {AlexaService, CommonClasses, LarynxClasses, LarynxInterfaces} from "larynx-sdk";
import {AppContext, Instance} from "../index";

export default class StartFrame extends AppContext implements LarynxInterfaces.IFrame {
    pre = function () {
        return new Promise(resolve => {
            resolve(new CommonClasses.RedirectResponse(false));
        });
    };
    prompts = function () {
        return new CommonClasses.TemplateResponseModel("standard", "<speak>Welcome to High Low Guessing Game. I'm thinking of a number between one and one hundred.</speak>");
    };
    transitions: LarynxInterfaces.ActionHandlers;
    sessionEnded = function () {
        return new Promise(resolve => {
            resolve();
        });
    };
}
