import {ISessionContext} from "larynx-sdk/dist/definitions/interfaces";
import {TemplateResponseModel} from "larynx-sdk/dist/platforms/common/common";

export class AppContext implements ISessionContext {
    attributes: any;
    slots?: any;

    constructor(attributes: {}) {
        this.attributes = attributes;
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