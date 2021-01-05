import {Group, useStageActions} from "use-digital-stage";
import React from "react";
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../ui/Modal";
import Button from "../../ui/Button";
import {useStyletron} from "styletron-react";
import Headline from "../../theme/Headline";

const DeleteGroupModal = (props: {
    group: Group;
    onClose: () => void;
}): JSX.Element => {
    const {group, onClose} = props;
    const [css] = useStyletron();
    const {removeGroup} = useStageActions();

    return (
        <Modal
            onClose={onClose}
        >
            <ModalHeader>
                <Headline variant="caption">Delete group <i>{group.name}</i></Headline>
            </ModalHeader>
            <ModalBody>
                Do you really want to delete the group <i>{group.name}</i>?
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
                        removeGroup(group._id);
                        onClose();
                    }}
                    type="submit"
                >Remove</Button>
            </ModalFooter>
        </Modal>
    );
};
export default DeleteGroupModal;
