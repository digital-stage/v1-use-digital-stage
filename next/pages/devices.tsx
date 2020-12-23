import React from "react";
import {useLocalDevice, useRemoteDevices} from "use-digital-stage";
import DeviceBox from "../components/devices/DeviceBox";
import Layout from "../components/global/Layout";


const Devices = () => {
    const localDevice = useLocalDevice();
    const remoteDevices = useRemoteDevices();

    return (
        <Layout>
            DEVICES
            {localDevice && <DeviceBox device={localDevice}/>}
            {remoteDevices.map(remoteDevice => <DeviceBox device={remoteDevice}/>)}
        </Layout>
    )
}
export default Devices;
