import React from "react";
import {useLocalDevice, useRemoteDevices} from "use-digital-stage";
import DeviceBox from "../components/devices/DeviceBox";
import StageLayout from "../components/theme/StageLayout";


const Devices = () => {
    const localDevice = useLocalDevice();
    const remoteDevices = useRemoteDevices();

    return (
        <StageLayout>
            DEVICES
            {localDevice && <DeviceBox device={localDevice}/>}
            {remoteDevices.map(remoteDevice => <DeviceBox device={remoteDevice}/>)}
        </StageLayout>
    )
}
export default Devices;
