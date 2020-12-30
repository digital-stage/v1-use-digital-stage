import {styled} from "styletron-react";
import React, {useRef} from "react";
import {colors, colorScheme, fonts} from "./Theme";
import useHover from "../../lib/useHover";

const InputWrapper = styled("div", {
    position: 'relative',
});
const InputField = styled("input", {
    ...fonts.input,
    paddingTop: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    backgroundColor: '#292929',
    borderBottomColor: colorScheme.input.borderBottom.default,
    outline: "none",
    ":hover": {
        borderBottomColor: '#3737f7',
        backgroundColor: '#1f1f1f',
    },
    ":focus": {
        borderBottomColor: '#3737f7',
    },
    ":active": {
        borderBottomColor: '#80cbc4'
    },
    ":filled": {
        borderBottomColor: '#f4f4f4'
    },
    ":invalid": {
        backgroundColor: 'rgba(157,19,19,0.4)',
        borderBottomColor: '#a41318',
    }
});
const Label = styled("label", (props: { $hover: boolean }) => ({
    position: 'absolute',
    ...fonts.label,
    color: props.$hover
        ? colors.typography.regular
        : colors.typography.micro,
}));

const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & {
    id?: string;
    label?: string;
    className?: string;
}) => {
    const hoverRef = useRef<HTMLDivElement>();
    const hover = useHover(hoverRef);
    const {id, label, className} = props;

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
            <InputField {...props}/>
        </InputWrapper>
    )
}
export default Input;
