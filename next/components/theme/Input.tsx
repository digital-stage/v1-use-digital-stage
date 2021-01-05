import {styled} from "styletron-react";
import React, {ChangeEventHandler, useCallback, useEffect, useRef, useState} from "react";
import useHover from "../../lib/useHover";
import fonts from "./theme/fonts";
import colors from "./theme/colors";

const InputWrapper = styled("div", {
    position: 'relative',
});
const InputField = styled("input", (props: { $hover: boolean, $valid: boolean }) => ({
    ...fonts.input.field,
    width: '100%',
    paddingTop: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    outline: "none",
    ":focus": {
        borderBottomColor: '#3737f7',
    },
    ":active": {
        borderBottomColor: '#80cbc4'
    },
    ":filled": {
        borderBottomColor: '#f4f4f4'
    },
    ...(props.$valid ? {
        backgroundColor: 'rgba(157,19,19,0.4)',
        borderBottomColor: '#a41318',
    } : {
        backgroundColor: props.$hover ? '#1f1f1f' : '#292929',
        borderBottomColor: props.$hover ? '#3737f7' : colors.input.borderBottom.default,
    })
}));
const Label = styled("label", (props: { $hover: boolean }) => ({
    position: 'absolute',
    ...fonts.input.label,
    color: props.$hover
        ? colors.text.regular.default
        : colors.text.muted.default,
}));
const Notification = styled('div', {
    ...fonts.input.notification,
    width: '100%',
    textAlign: 'right'
});

const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & {
    id?: string;
    label?: string;
    className?: string;
    notification?: string;
    value?: string | ReadonlyArray<string> | number;
    valid?: boolean;
}) => {
    const {id, label, className, notification, maxLength, value, valid} = props;
    const hoverRef = useRef<HTMLDivElement>();
    const hover = useHover(hoverRef);
    const [length, setLength] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>();
    const [currentValue, setCurrentValue] = useState<string | ReadonlyArray<string> | number>();
    const [currentInvalid, setCurrentInvalid] = useState<boolean>(false);

    const handleInput = useCallback((event) => {
        const value = event.target.value;
        setLength(value.length);
        setCurrentValue(value);
        setCurrentInvalid(!valid || false);
    }, [valid]);

    const handleInvalid = useCallback((event) => {
        setCurrentInvalid(!valid || event.target.isValid);
    }, [])

    useEffect(() => {
        setCurrentValue(value);
    }, [value])

    useEffect(() => {
        setCurrentInvalid(valid);
    }, [valid])

    return (
        <InputWrapper
            ref={hoverRef}
            className={className}
        >
            {label && (
                <Label htmlFor={id} $hover={hover}>
                    {label}
                </Label>
            )}
            <InputField
                ref={inputRef}
                $hover={hover}
                $valid={valid}
                {...props}
                value={currentValue}
                onInput={handleInput}
                onInvalid={handleInvalid}
            />
            <Notification>
                {notification ? notification : maxLength ? (length + "/" + maxLength) : undefined}
            </Notification>
        </InputWrapper>
    )
}
export default Input;
