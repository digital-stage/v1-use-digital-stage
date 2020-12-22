import React, {useCallback} from "react";

export interface Option {
    id: any;
    label: any;

    [key: string]: any;
}

const Select = (props: {
    options?: Option[];
    selected: any;
    onSelected(option: Option): void;
    className?: string;
}) => {
    const {options, onSelected, className, selected} = props;

    const handleSelect = useCallback((event) => {
        onSelected(options.find(o => o.id === event.target.value));
    }, [options, onSelected])

    console.log(selected)

    return (
        <select className={className} onChange={handleSelect} value={selected}>
            {options && options.map(o => <option
                key={o.id}
                value={o.id}
            >{o.label}</option>)}
        </select>
    )
};
export default Select;
