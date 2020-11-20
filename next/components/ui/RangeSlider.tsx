import React, {useEffect, useState} from "react";

const RangeSlider = (props: {
    volume: number,
    onChange: (volume: number) => any
}) => {
    const {volume, onChange} = props;
    const [value, setValue] = useState<number>(volume);

    useEffect(() => {
        if (volume !== value)
            setValue(volume)
    }, [volume]);

    return (
        <input type="range"
               min={0}
               max={1}
               step={0.1}
               value={value}
               onChange={(event) => {
                   const v = event.target.valueAsNumber;
                   setValue(v);
                   onChange(v)
               }}/>
    )
}
export default RangeSlider;
