import Button from "./Button";
import {styled} from "styletron-react";
import React, {useEffect, useRef} from "react";
import {colors} from "./Theme";
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';

const Wrapper = styled("div", {
    position: "fixed",
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'auto'
})

const Backdrop = styled("div", {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: colors.modal.backdrop.background,
    zIndex: -1
})

const OuterModalWrapper = styled("div", {
    minHeight: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: colors.modal.backdrop.background,
})

const InnerModalWrapper = styled("div", (props: {
    $full: boolean
}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: props.$full ? '100%' : '80vw',
    maxWidth: props.$full ? undefined : '800px',
    backgroundColor: colors.modal.background,
    borderRadius: '1rem',
    overflow: 'hidden',
}));

const ModalHeaderWrapper = styled("div", {
    width: '100%',
    color: colors.text.default,
    backgroundColor: colors.modal.header.background,
    padding: '1rem'
})
const ModalBodyWrapper = styled("div", {
    width: '100%',
    color: colors.text.default,
    backgroundColor: colors.modal.body.background,
    padding: '1rem',
    overflow: 'scroll'
})
const ModalFooterWrapper = styled("div", {
    width: '100%',
    color: colors.text.default,
    backgroundColor: colors.modal.footer.background,
    padding: '1rem'
})

const Modal = (props: {
    onClose?: () => void;
    children: React.ReactNode;
    size?: "full" | "auto";
    className?: string;
}) => {
    const {onClose, children, size, className} = props;
    const modalRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (modalRef.current) {
            disableBodyScroll(modalRef.current)
            return () => clearAllBodyScrollLocks()
        }
    }, [modalRef]);

    return (
        <Wrapper>
            <OuterModalWrapper
                onClick={() => {
                    if (onClose)
                        onClose();
                }}
            >
                <InnerModalWrapper
                    className={className}
                    onClick={(e) => e.stopPropagation()}
                    ref={modalRef}
                    $full={size && size === "full"}
                >
                    {children}
                </InnerModalWrapper>
            </OuterModalWrapper>
        </Wrapper>
    );
}

const ModalHeader = (
    props: {
        children: React.ReactNode;
        className?: string;
    }
) => {
    const {children, className} = props;
    return (
        <ModalHeaderWrapper className={className}>
            {children}
        </ModalHeaderWrapper>
    )
}
const ModalBody = (
    props: {
        children: React.ReactNode;
        className?: string;
    }) => {
    const {children, className} = props;
    return (
        <ModalBodyWrapper className={className}>
            {children}
        </ModalBodyWrapper>
    )
}
const ModalFooter = (
    props: {
        children: React.ReactNode;
        className?: string;
    }) => {
    const {children, className} = props;
    return (
        <ModalFooterWrapper className={className}>
            {children}
        </ModalFooterWrapper>
    )
}
const ModalButton = Button;
export {
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton
}

export default Modal;
