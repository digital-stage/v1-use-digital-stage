import useDigitalStage from "../..";
import OverlayInformer from "./ui/OverlayInformer";
import React from "react";
import {Status} from "../..";

const StatusInformer = () => {
    const {status} = useDigitalStage();

    if (status === Status.connecting) {
        return (
            <OverlayInformer>
                Connecting to API server...
            </OverlayInformer>
        )
    }

    return null;
}
export default StatusInformer;
