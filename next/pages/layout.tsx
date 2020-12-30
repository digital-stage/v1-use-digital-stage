import React, {useState} from "react";
import Headline from "../components/ui/Headline";
import Paragraph from "../components/ui/Paragraph";
import {styled} from "styletron-react";
import Button from "../components/theme/Button";
import {colors} from "../components/theme/Theme";
import Toggle from "../components/theme/Toggle";
import {BiCube} from "react-icons/bi";
import TextInput from "../components/theme/TextInput";

const Background = styled("div", {
    backgroundColor: colors.background.default,
    width: '100%',
    minHeight: '100vh',
    padding: '2rem'
})

const Layout = () => {
    const [toggled, setToggled] = useState<boolean>(false);

    return (
        <Background>
            <Headline variant="h1">Headline 1</Headline>
            <Headline variant="h2">Headline 2</Headline>
            <Headline variant="h3">Headline 3</Headline>
            <Headline variant="h4">Headline 4</Headline>
            <Headline variant="h5">Headline 5</Headline>
            <Headline variant="h6">Headline 6</Headline>
            <Paragraph>Body text</Paragraph>
            <Paragraph variant="micro">Micro text</Paragraph>
            <Button $variant="primary">
                Primary Button
            </Button>
            <Button $variant="primary" disabled>
                Disabled primary Button
            </Button>
            <Button $variant="secondary">
                Secondary Button
            </Button>
            <Button $variant="secondary" disabled>
                Disabled secondary Button
            </Button>
            <Button $variant="tertiary">
                Tertiary Button
            </Button>
            <Button $variant="danger">
                Danger Button
            </Button>
            <Button $variant="danger" disabled>
                Disabled danger Button
            </Button>
            <Toggle active={toggled} onToggle={() => setToggled(prev => !prev)}>
                <BiCube size={24}/>
            </Toggle>
            <Toggle variant="tertiary" active={toggled} onToggle={() => setToggled(prev => !prev)}>
                <BiCube size={24}/>
            </Toggle>
            <TextInput
                required
                minLength={1}
                maxLength={16}
                label="Your input field"

            />
        </Background>
    )
}
export default Layout;
