import * as React from 'react';
import * as Yup from 'yup';
import {Form, Field, Formik} from 'formik';
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../ui/Modal";
import {Group, useStageActions} from "use-digital-stage";
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

const ModifyGroupModalSchema = Yup.object().shape({
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

const ModifyGroupModal = (props: {
    group: Group;
    onClose?(): void;
}): JSX.Element => {
    const {onClose, group} = props;
    const [css] = useStyletron();
    const {updateGroup} = useStageActions();

    return (
        <Modal
            onClose={onClose}
        >
            <ModalHeader>
                <Headline variant="caption">Edit <i>{group.name}</i></Headline>
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
                validationSchema={ModifyGroupModalSchema}
                onSubmit={(values: Values) => {
                    updateGroup(
                        group._id,
                        {
                            name: values.name
                        }
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
                                $round={true}
                                onClick={onClose}
                            >Cancel</Button>
                            <Button
                                $border={true}
                                $round={true}
                                type="submit"
                            >Save</Button>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
export default ModifyGroupModal;
