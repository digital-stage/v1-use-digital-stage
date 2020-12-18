import React, {useCallback} from "react";

export interface Option {
    id: any;
    value: any;

    [key: string]: any;
}

const Select = (props: {
    options?: Option[];
    selected: any;
    onSelected?(option: Option): void;
    className?: string;
}) => {
    const {options, onSelected, className, selected} = props;

    const handleSelect = useCallback((event) => {
        onSelected(options.find(o => o.id === event.target.value));
    }, [options])

    return (
        <select className={className} onChange={handleSelect}>
            {options && options.map(o => <option
                selected={selected.id === o.id}
                key={o.id}
                value={o.id}
            >{o.value}</option>)}
        </select>
    )
};
export default Select;
