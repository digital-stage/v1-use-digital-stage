import React from "react";
import Link from "next/link";
import {styled} from "styletron-react";
import {colors} from "./Theme";

const A = styled("a", {
    color: colors.interaction.default,
    cursor: 'pointer',
    ":active": {
        color: colors.interaction.active
    },
    ":hover": {
        color: colors.interaction.hover
    },
    ":focus": {
        color: colors.interaction.focus
    }
});

const StyledLink = (props: {
    children: React.ReactNode;
    href?: string | undefined;
    className?: string;
}) => {
    const {className, href, children} = props;

    return (
        <Link href={href}>
            <A className={className}>
                {children}
            </A>
        </Link>
    )
};
export default StyledLink;
