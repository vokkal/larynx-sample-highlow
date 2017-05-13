import {initialize, LarynxInstance} from "larynx-sdk";
import {
    AlexaRequestBody, AlexaResponseBody, LambdaContext, Response
} from "larynx-sdk/dist/definitions/AlexaService";
import {AlexaRequestAdapter} from "larynx-sdk/dist/platforms/alexa/Alexa";
import * as fs from "fs";
import {RegisterActions} from "./actionMap";
import {RegisterFrames} from "./frameMap";
import {AppContext, TemplateModel} from "./base";

export const Instance: LarynxInstance = initialize({});

RegisterActions();
RegisterFrames();

export function AlexaHandler(event: AlexaRequestBody, context: LambdaContext, callback: (err: Error | undefined, response: any | undefined) => void) {

    console.log("Request:\n" + JSON.stringify(event));

    if (!event.session.attributes) {
        event.session.attributes = {};
    }

    let appContext = new AppContext(event.session.attributes);

    let RequestAdapter = new AlexaRequestAdapter(event, {name: "EntryPoint"}, Instance.Actions);

    appContext.slots = RequestAdapter.event.params;

    Instance.HandleEvent(RequestAdapter, appContext).then((responseModel: TemplateModel) => {
        console.log("response model: " + JSON.stringify(responseModel, undefined, 4));

        let rendered: any = Instance.Render(fs.readFileSync(__dirname + "/templates/alexa/response.pug").toString(), responseModel);

        let response = { // TODO: types for rendered response
            version: "1.0",
            response: rendered["response"],
            sessionAttributes: responseModel.attributes
        };

        console.log("response:\n" + JSON.stringify(response, undefined, 4));
        callback(undefined, response);
    }).catch((error: Error) => {
        console.log("error: " + error);
        callback(undefined, error);
    });
}