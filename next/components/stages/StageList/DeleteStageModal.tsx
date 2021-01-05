import {useStageActions, Stage} from "use-digital-stage";
import React from "react";
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../ui/Modal";
import Button from "../../ui/Button";
import {useStyletron} from "styletron-react";
import Headline from "../../theme/Headline";

const DeleteStageModal = (props: {
    stage: Stage;
    onClose: () => void;
}): JSX.Element => {
    const {stage, onClose} = props;
    const [css] = useStyletron();
    const {removeStage} = useStageActions();

    return (
        <Modal
            onClose={onClose}
        >
            <ModalHeader>
                <Headline variant="caption">Delete Stage <i>{stage.name}</i></Headline>
            </ModalHeader>
            <ModalBody>
                Do you really want to delete the stage <i>{stage.name}</i>?
            </ModalBody>
            <ModalFooter
                className={css({
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                })}
            >
                <Button
                    $border={true}
                    onClick={onClose}
                >Cancel</Button>
                <Button
                    $border={true}
                    onClick={() => {
                        removeStage(stage._id);
                        onClose();
                    }}
                    type="submit"
                >Remove</Button>
            </ModalFooter>
        </Modal>
    );
};
export default DeleteStageModal;
