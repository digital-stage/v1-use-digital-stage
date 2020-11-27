import Button from "./Button";
import {styled} from "styletron-react";
import React from "react";

const Wrapper = styled("div", {
    position: "fixed",
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const Backdrop = styled("div", {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: -1
})

const ModalWrapper = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    borderRadius: '1rem',
    overflow: 'hidden',
})

const ModalHeaderWrapper = styled("div", {
    width: '100%',
    color: '#fff',
    backgroundColor: '#000',
    padding: '1rem'
})
const ModalBodyWrapper = styled("div", {
    width: '100%',
    color: '#000',
    backgroundColor: '#fff',
    padding: '1rem'
})
const ModalFooterWrapper = styled("div", {
    width: '100%',
    color: '#fff',
    backgroundColor: '#000',
    padding: '1rem'
})

const Modal = (props: {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    closeOnBackdropClicked?: boolean;
}) => {
    const {isOpen, onClose, children, closeOnBackdropClicked} = props;

    if (isOpen) {
        return (
            <Wrapper>
                <Backdrop onClick={() => {
                    if (closeOnBackdropClicked && onClose)
                        onClose();
                }}/>
                <ModalWrapper>
                    {children}
                </ModalWrapper>
            </Wrapper>
        );
    }

    return null;
}

const ModalHeader = (
    props: {
        children: React.ReactNode
    }
) => {
    const {children} = props;
    return (
        <ModalHeaderWrapper>
            {children}
        </ModalHeaderWrapper>
    )
}
const ModalBody = (
    props: {
        children: React.ReactNode
    }) => {
    const {children} = props;
    return (
        <ModalBodyWrapper>
            {children}
        </ModalBodyWrapper>
    )
}
const ModalFooter = (
    props: {
        children: React.ReactNode
    }) => {
    const {children} = props;
    return (
        <ModalFooterWrapper>
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
