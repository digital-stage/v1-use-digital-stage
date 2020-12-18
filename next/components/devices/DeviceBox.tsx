import React from "react";
import {Device, useStageActions} from "use-digital-stage";
import {styled} from "styletron-react";
import {breakpoints, colors} from "../ui/Theme";
import Select from "../ui/Select";

const Box = styled("div", {
    backgroundColor: colors.background.darker,
    borderRadius: "1rem",
    padding: '1rem',
    width: '1000%',
    [breakpoints.TABLET]: {
        width: '25%'
    }
});


const OvBox = (props: {
    device: Device
}) => {
    const {device} = props;

    return (
        <Box>
            OVBOX
            <ul>
                <li>
                    {device.name}
                </li>
                <li>
                    {device.canAudio}
                </li>
            </ul>
        </Box>
    )
};

const WebRTCBox = (props: {
    device: Device
}) => {
    const {device} = props;
    const {updateDevice} = useStageActions();

    return (
        <Box>
            <ul>
                <li>
                    {device.name}
                </li>
                <li>
                    <Select
                        options={device.inputAudioDevices || []}
                        selected={device.inputAudioDeviceId}
                        onSelected={(option) => {
                            updateDevice(device._id, {
                                inputAudioDeviceId: option.id
                            })
                        }}
                    />
                </li>
                <li>
                    <Select
                        options={device.inputVideoDevices || []}
                        selected={device.inputVideoDeviceId}
                        onSelected={(option) => {
                            updateDevice(device._id, {
                                inputVideoDeviceId: option.id
                            })
                        }}
                    />
                </li>
                <li>
                    <Select
                        options={device.outputAudioDevices || []}
                        selected={device.outputAudioDeviceId}
                        onSelected={(option) => {
                            updateDevice(device._id, {
                                outputAudioDeviceId: option.id
                            })
                        }}
                    />
                </li>
            </ul>
        </Box>
    )
};

const DeviceBox = (props: {
    device: Device
}) => {
    const {device} = props;

    if (device.canOv)
        return <OvBox device={device}/>

    return <WebRTCBox device={device}/>
};

export default DeviceBox;
