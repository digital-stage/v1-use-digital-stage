import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import useDigitalStage, {useStageActions} from "use-digital-stage";
import useStageJoiner, {Errors} from "../lib/useStageJoiner";
import Modal, {ModalBody, ModalButton, ModalFooter, ModalHeader} from "./ui/Modal";
import Input from "./ui/Input";

/**
 * The StageJoiner is a usually hidden component,
 * that reacts to requested stage joins and displays errors if occurring
 *
 * @constructor
 */
const StageJoiner = () => {
    const { ready } = useDigitalStage();
    const {
        stageId, groupId, password, reset
    } = useStageJoiner();
    const stageActions = useStageActions();
    const [retries, setRetries] = useState<number>(0);
    const [wrongPassword, setWrongPassword] = useState<boolean>();
    const [notFound, setNotFound] = useState<boolean>();
    const passwordRef = useRef<HTMLInputElement>();

    const clear = useCallback(() => {
        setNotFound(false);
        setWrongPassword(false);
        reset();
    }, [reset]);

    const retryJoiningStage = useCallback((stageId: string, groupId: string, password?: string) => {
        // Try to connect
        stageActions.joinStage(stageId, groupId, password)
            .then(() => {
                console.log('Joined');
                clear();
            })
            .catch((error) => {
                console.log('Could not join stage');
                console.log(error);
                if (error === Errors.INVALID_PASSWORD) {
                    setWrongPassword(true);
                } else {
                    setNotFound(true);
                }
            })
    }, [stageActions, clear]);

    useEffect(() => {
        if (ready) {
            if (stageId && groupId) {
                setNotFound(false);
                setWrongPassword(false);
                retryJoiningStage(stageId, groupId);
            }
        }
    }, [ready, stageId, groupId, password]);

    return (
        <>
            <Modal
                isOpen={notFound}
                onClose={() => setNotFound(false)}
            >
                <ModalHeader>Bühne nicht gefunden</ModalHeader>
                <ModalFooter>
                    <ModalButton onClick={() => setNotFound(false)}>Verstanden</ModalButton>
                </ModalFooter>
            </Modal>
            <Modal
                isOpen={wrongPassword}
                onClose={() => clear()}
            >
                <ModalHeader>{retries === 0 ? 'Passwort notwendig' : 'Falsches Passwort'}</ModalHeader>
                <ModalBody>
                    <Input ref={passwordRef} type="password" />
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={() => clear()}>Abbrechen</ModalButton>
                    <ModalButton
                        onClick={() => {
                            const updatePassword = passwordRef.current.value;
                            setRetries((prevState) => prevState + 1);
                            retryJoiningStage(stageId, groupId, updatePassword);
                        }}
                    >
                        Erneut versuchen
                    </ModalButton>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default StageJoiner;
