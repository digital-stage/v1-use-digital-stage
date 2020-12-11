import React, {useCallback, useEffect, useState} from "react";

export interface Option {
    id: any;
    value: string;
}

const Select = (props: {
    options?: Option[];
    onSelected?(id: any): void;
}) => {
    const {options, onSelected} = props;
    const [selected, setSelected] = useState<Option>();

    useEffect(() => {
        if (options) {
            if (selected && !options.find(o => o.id === selected.id)) {
                setSelected(undefined);
            }
        } else {
            setSelected(undefined);
        }
    }, [options]);

    const handleSelect = useCallback((event) => {
        setSelected(options.find(o => o.value === event.target.value));
    }, [options])

    return (
        <select onSelect={handleSelect}>
            {options && options.map(o => <option value={o.id}>{o.value}</option>)}
        </select>
    )
};
export default Select;
