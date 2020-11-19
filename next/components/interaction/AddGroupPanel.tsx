import Input from "../Input";
import Button from "../Button";
import React, {useRef} from "react";

const AddGroupPanel = (props: {
    onClick(stageName: string): void
}) => {
    const groupNameRef = useRef<HTMLInputElement>();

    return (
        <>
            <Input type="text" placeholder="group name" ref={groupNameRef}/><Button
            onClick={() => props.onClick(groupNameRef.current.value)}>Add</Button>
        </>
    )
};
export default AddGroupPanel;
