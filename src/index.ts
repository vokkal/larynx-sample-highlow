import {initialize, LarynxInstance} from "larynx-sdk";
import {AlexaRequestBody, LambdaContext} from "larynx-sdk/dist/definitions/AlexaService";
import {ISessionContext} from "larynx-sdk/dist/definitions/interfaces";
import {AlexaRequestAdapter} from "larynx-sdk/dist/platforms/alexa/Alexa";

export const Instance: LarynxInstance = initialize({});

export class AppContext implements ISessionContext {
    attributes: any;
    constructor(attributes: {}) {
        this.attributes = attributes;
    }
}

export function AlexaHandler(event: AlexaRequestBody, context: LambdaContext, callback: () => void) {

    let appContext = new AppContext(event.session.attributes);
    let RequestAdapter = new AlexaRequestAdapter(event, {name: "Entry"}, Instance.Actions);

}


/*

 class Container implements LarynxClasses.EventContainer {
 frameId: LarynxInterfaces.Frames;
 impl: any;
 targets: Array<LarynxInterfaces.Frames>;
 }


 class LarynxEventContext implements ContextOptions {
 attributes: any;
 myVal: string;

 constructor(options: {ContextOptions: ContextOptions}) {
 this.attributes = options.ContextOptions.attributes;
 this.myVal = options.ContextOptions.myVal;
 }
 }

 /**
 * Register a basic frame. Has no intent handlers so should end the session.
 */

/*
 sdk.Register("Introduction", class extends LarynxEventContext implements IFrame {
 prompts = function () {
 return new TemplateResponseModel("hello world", "<speak>Hello, " + this.stuff + "!</speak>");
 };

 sessionEnded = function () {
 return new Promise(resolve => {
 resolve();
 });
 };
 });

 sdk.Register("Redirect", class extends LarynxEventContext implements IFrame {
 pre = function () {
 return new Promise(resolve => {
 resolve(new RedirectResponse(true, "Introduction"));
 });
 };

 sessionEnded = function () {
 return new Promise(resolve => {
 resolve();
 });
 };
 });


 /**
 * Empty frame to test redirect in pre-exec function. Use pre() to check for any preconditions needed for
 * prompt handlers
 */




/*
 async function LambdaHandler(event: any, context: LambdaContext, callback: any) {

 // Define attributes that will be available in each frame
 let options = new ContextOptions();
 options.attributes = event.session.attributes;
 options.stuff = "world";

 // Build an Alexa event context
 // Use a different event context builder for another service (e.g. Google)
 let eventContext = new AlexaEventContext({ContextOptions: options});

 // Build request handler
 let requestHandler = new AlexaRequestHandler(event);

 // Find the currently active frame or the default
 let currentFrames = larynx.Frames[requestHandler.currentFrame.name];

 try {
 let responseData = await sdk.LarynxEventHandler(larynxEvent, currentFrames, eventContext);

 console.log("now: %j", responseData);

 let template = fs.readFileSync("./templates/alexa/response.pug");

 let rendered = pug.render(template, responseData);

 let responseObj = JSON.parse(parser.toJson(rendered));

 let r = new AlexaResponse();
 r.response = responseObj.response;
 r.sessionAttributes = options.attributes;
 r.version = "1.0";

 console.log("alexa response -> %j", r);

 } catch (err) {
 console.log("error: " + err)
 }
 }

 class AlexaResponse implements AlexaResponseBody {
 sessionAttributes: any[];
 response: Response;
 version: string;
 }

 // export const handler = LambdaHandler;


 let event = {
 "session": {
 "sessionId": "SessionId.2b19282c-0dd7-4bb4-8ddf-faf92879abce",
 "application": {
 "applicationId": "amzn1.echo-sdk-ams.app.61df91bc-a5f9-4c5f-9436-91b5c5694ca4"
 },
 "attributes": {"aval": "valll"},
 "user": {
 "userId": "amzn1.account.AFOQLP3TRKTIAN45J5LRLLELIVTQ"
 },
 "new": true
 },
 "request": {
 "type": "IntentRequest",
 "requestId": "EdwRequestId.15df9c9e-11cc-4f82-b57b-21772ff64241",
 "locale": "en-US",
 "timestamp": "2017-03-25T23:28:37Z",
 "intent": {
 "name": "RepeatFactIntent",
 "slots": {}
 }
 },
 "version": "1.0"
 };

 LambdaHandler(event, undefined, undefined);

 console.log("redirs: " + new redirectFrame(null).frameTargets)
 */