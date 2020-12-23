import * as React from 'react';
import * as Yup from 'yup';
import {Form, Field, Formik} from 'formik';
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../ui/Modal";
import {Stage, useStageActions} from "use-digital-stage";
import Input from "../../ui/Input";
import Button from '../../ui/Button';
import {styled, useStyletron, withStyleDeep} from "styletron-react";
import Table, {HalfColumn} from '../../ui/Table';
import Headline from "../../ui/Headline";

const StyledInput = withStyleDeep(Input, {
    marginBottom: '.4rem'
})

interface Values {
    name: string;
}

const CreateGroupModalSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Der Name ist zu kurz')
        .max(100, 'Der Name ist zu lang')
        .required('Ein Gruppenname wird benötigt'),
});

const Label = styled('label', {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
})

const CreateGroupModal = (props: {
    stage: Stage;
    onClose?(): void;
}): JSX.Element => {
    const {onClose, stage} = props;
    const [css] = useStyletron();
    const {createGroup} = useStageActions();

    return (
        <Modal
            onClose={onClose}
        >
            <ModalHeader>
                <Headline variant="caption">Create new group inside stage <i>{stage.name}</i></Headline>
            </ModalHeader>
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                    width: 25,
                    length: 13,
                    height: 7.5,
                    damping: 0.7,
                    absorption: 0.6,
                }}
                validationSchema={CreateGroupModalSchema}
                onSubmit={(values: Values) => {
                    createGroup(
                        stage._id,
                        values.name
                    );
                    props.onClose();
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <ModalBody>
                            <Table>
                                <HalfColumn>
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    {errors.name && (
                                        <div>{errors.name}</div>
                                    )}
                                </HalfColumn>
                                <HalfColumn>
                                    <Field
                                        as={StyledInput}
                                        type="text"
                                        name="name"
                                        id="name"
                                    />
                                </HalfColumn>
                            </Table>
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
                                type="submit"
                            >Create</Button>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
export default CreateGroupModal;
