import React from "react";
import Wrapper from "../components/ui/Wrapper";
import {useLocalDevice, useRemoteDevices} from "use-digital-stage";
import DeviceBox from "../components/devices/DeviceBox";


const Devices = () => {
    const localDevice = useLocalDevice();
    const remoteDevices = useRemoteDevices();

    return (
        <Wrapper>
            DEVICES
            {localDevice && <DeviceBox device={localDevice}/>}
            {remoteDevices.map(remoteDevice => <DeviceBox device={remoteDevice}/>)}
        </Wrapper>
    )
}
export default Devices;
