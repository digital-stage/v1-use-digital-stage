import {createContext, useContext, useState} from "react";


interface ModalContext {
    modal?: JSX.Element;

    setModal(modal: JSX.Element);
}

const Context = createContext<ModalContext>({
    setModal: () => {
        throw new Error("Please wrap your DOM Tree with an instance of ModalProvider")
    }
});

const ModalProvider = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;
    const [modal, setModal] = useState<JSX.Element | undefined>(undefined);

    return (
        <Context.Provider value={{
            modal,
            setModal
        }}>
            {children}
        </Context.Provider>
    )
}

const ModalInjector = (): JSX.Element => {
    const {modal} = useModal();

    if (modal)
        return modal;

    return null;
}

const useModal = (): ModalContext => useContext<ModalContext>(Context);

export {
    ModalInjector,
    ModalProvider
}
export default useModal;
