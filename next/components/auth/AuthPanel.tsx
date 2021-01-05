import React from "react";
import Panel from "../theme/Panel";
import Headline from "../theme/Headline";
import Link from "next/link";
import {useIntl} from "react-intl";
import {styled} from "styletron-react";
import {useRouter} from "next/router";
import colors from "../theme/theme/colors";
import breakpoints from "../theme/theme/breakpoints";

const StyledPanel = styled(Panel, {
    width: '100%',
    marginTop: '12px',
    marginBottom: '12px',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '332px',
    minWidth: '0px',
    paddingTop: '24px',
    paddingBottom: '24px',
    paddingLeft: '16px',
    paddingRight: '16px',
    [breakpoints.TABLET]: {
        paddingLeft: '24px',
        paddingRight: '24px',
    }
});

const Header = styled("div", {
    display: 'flex',
    width: '100%',
});

const Selector = styled("div", (props: { $active: boolean }) => ({
    display: 'block',
    cursor: 'pointer',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: props.$active ? colors.stageRed : 'transparent',
    transition: 'border 1s ease-out',
    ":hover": {
        borderBottomColor: colors.stageRed
    }
}));

const AuthPanel = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;
    const {pathname} = useRouter();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

    return (
        <StyledPanel>
            <Header>
                <Link href="/auth/login">
                    <Selector $active={pathname === "/auth/login"}>
                        <Headline variant="h4">{f('login')}</Headline>
                    </Selector>
                </Link>
                <Link href="/auth/signup">
                    <Selector $active={pathname === "/auth/signup"}>
                        <Headline variant="h4">{f('signUp')}</Headline>
                    </Selector>
                </Link>
            </Header>

            {children}
        </StyledPanel>
    )
};
export default AuthPanel;
