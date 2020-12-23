import {colors} from "./Theme";
import {styled} from "styletron-react";

const P = styled('p', {
    color: colors.text.default,
})


const Paragraph = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;

    return (
        <P>
            {children}
        </P>
    )
}
export default Paragraph;
