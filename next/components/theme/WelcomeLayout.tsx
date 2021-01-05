import {styled, useStyletron} from "styletron-react";
import React from "react";
import {useIntl} from "react-intl";
import Headline from "./Headline";
import Paragraph from "./Paragraph";
import Text from "./Text";

const Wrapper = styled("div", {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent linear-gradient(221deg,#F20544 0%,#F00544 2%,#F20544 2%,#F20544 10%,#721542 50%,#012340 100%) 0% 0% no-repeat padding-box;',
});
const Logo = styled("img", {
    width: '130px',
    padding: '1rem'
})
const Header = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})
const Centered = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})
const Footer = styled("div", {})

const WelcomeLayout = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;
    const [css] = useStyletron();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

    return (
        <Wrapper>
            <Header>
                <Logo src="/static/logo.svg" alt={f("projectName")}/>
                <Headline
                    className={css({
                        maxWidth: '300px',
                        margin: 0
                    })}
                    variant="h4">
                    {f("projectDescription")}
                </Headline>
            </Header>
            <Centered>
                {children}
            </Centered>
            <Footer>
                <Text variant="micro">Version 0.2</Text>
            </Footer>

        </Wrapper>
    )
};

export default WelcomeLayout;
