import {ISessionContext} from "larynx-sdk/dist/definitions/interfaces";
import {TemplateResponseModel} from "larynx-sdk/dist/platforms/common/common";

export class AppContext implements ISessionContext {
    attributes: any;
    slots?: any;

    constructor(attributes: { ContextOptions: { attributes: {}, slots: {} } }) {
        console.log("adding: " + JSON.stringify(attributes, undefined, 4));

        this.attributes = {};

        if (attributes && attributes.ContextOptions && attributes.ContextOptions.attributes) {
            this.attributes = Object.assign(this.attributes, attributes.ContextOptions.attributes);
        }

        if (attributes && attributes.ContextOptions && attributes.ContextOptions.slots) {
            this.slots = Object.assign({}, attributes.ContextOptions.slots);
        }
    }
}

export class TemplateModel extends TemplateResponseModel implements AppContext {
    constructor(name: string, response?: any) {
        super(name, "");
        this.responseName = name;
        this.response = response;
    }

    response: {
        speech: {
            text?: string,
            ssml?: string
        },
        reprompt?: {
            text?: string,
            ssml?: string
        },
        card?: {
            title: string,
            text: string
        }
    };

    attributes: any;
    slots: any;
}