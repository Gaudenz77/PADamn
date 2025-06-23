import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld } from "./ReactCompressorMark2"; // No need to import IHelloWorldProps anymore
import * as React from "react";

export class ReactCompressorMark2 implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(HelloWorld); // No props needed
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Cleanup if needed
    }
}
