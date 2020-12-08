import React, {useEffect, useState} from "react";
import CodeWrapper from "../../components/ui/CodeWrapper";
import {useDevice, useDevices} from "use-digital-stage";
import DocsWrapper from "../../components/docs/DocsWrapper";

const Devices = () => {
    const devices = useDevices();
    const [deviceId, setDeviceId] = useState<string>();
    const device = useDevice(deviceId);
    useEffect(() => {
        if (!deviceId)
            setDeviceId(devices.allIds[0])
    }, [devices])

    return (
        <DocsWrapper>
            <h2>Usage</h2>
            <h3>Fetch</h3>
            <p>
                Get all available devices by using:
            </p>
            <CodeWrapper>const devices = useDevices()</CodeWrapper>
            <p>
                Get single device by using:
            </p>
            <CodeWrapper>const device = useDevice(&lt;deviceId&gt;)</CodeWrapper>
            <h3>Update</h3>
            <p>
                Use actions to update any device:
            </p>
            <CodeWrapper>
                const &#123;actions&#125; = useDigitalStage();<br/>
                actions.updateDevice(&lt;deviceId&gt;, {JSON.stringify({
                sendAudio: true,
                sendVideo: false
            })})
            </CodeWrapper>
            <h2>Result</h2>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {devices.allIds.map(id => {
                        const device = devices.byId[id];
                        return (
                            <li key={device._id}>
                                {device._id} - {device.name}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Single device</h3>
            <select onChange={(event) => setDeviceId(event.target.value)} value={deviceId}>
                {devices.allIds.map(sId => {
                    const device = devices.byId[sId];
                    return (
                        <option key={device._id} value={device._id}>{device.name}</option>
                    )
                })}
            </select>
            <CodeWrapper>
                <pre>
                {JSON.stringify(device, null, 2)}
                </pre>
            </CodeWrapper>
        </DocsWrapper>
    )
}
export default Devices;
