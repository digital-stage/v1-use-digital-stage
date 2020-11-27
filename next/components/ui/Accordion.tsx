import {styled} from "styletron-react";
import React, {useEffect, useRef, useState} from "react";

const Wrapper = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
})
const Header = styled("div", {
    display: 'flex',
    width: "100%",
    cursor: 'pointer'
})
const ContentWrapper = styled("div", {
    width: '100%'
});
const Body = styled("div", (props: {
    $expanded: boolean,
    $height: number
}) => ({
    overflow: "hidden",
    width: '100%',
    height: 'auto',
    maxHeight: props.$expanded ? props.$height + "px" : '0',
    transitionDuration: '.2s',
    transitionTimingFunction: 'ease-out',
    transitionProperty: 'max-height',
}));

const Accordion = (props: {
    children: React.ReactNode;
    header: React.ReactNode;
    expanded?: boolean;
    onHeaderClicked?: (collapsed: boolean) => void;
    className?: string
}) => {
    const {children, header, expanded, onHeaderClicked, className} = props;
    const [intExpanded, setIntExpanded] = useState<boolean>();
    const contentRef = useRef<HTMLDivElement>();
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        setIntExpanded(expanded);
    }, [expanded])

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [contentRef, children])

    return (
        <Wrapper className={className}>
            <Header onClick={() => {
                if (onHeaderClicked) {
                    onHeaderClicked(!intExpanded);
                }
                setIntExpanded(prev => !prev);
            }}>
                {header}
            </Header>
            <Body $expanded={intExpanded} $height={contentHeight}>
                <ContentWrapper ref={contentRef}>
                    {children}
                </ContentWrapper>

            </Body>
        </Wrapper>
    )
}
export default Accordion;
