import Input from "../Input";
import Button from "../Button";
import React, {useRef} from "react";

const AddStagePanel = (props: {
    onClick(stageName: string): void
}) => {
    const stageNameRef = useRef<HTMLInputElement>();

    return (
        <>
            <Input type="text" placeholder="stage name" ref={stageNameRef}/><Button
            onClick={() => props.onClick(stageNameRef.current.value)}>Add</Button>
        </>
    )
};
export default AddStagePanel;
