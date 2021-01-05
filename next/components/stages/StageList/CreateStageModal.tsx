import * as React from 'react';
import * as Yup from 'yup';
import {Form, Field, Formik} from 'formik';
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../ui/Modal";
import {useStageActions} from "use-digital-stage";
import Input from "../../ui/Input";
import Button from '../../ui/Button';
import {styled, useStyletron, withStyleDeep} from "styletron-react";
import Table, {FullColumn, HalfColumn} from '../../ui/Table';
import Headline from "../../theme/Headline";

const StyledInput = withStyleDeep(Input, {
    marginBottom: '.4rem'
})

interface Values {
    name: string;
    password: string;
    width: number;
    length: number;
    height: number;
    damping: number;
    absorption: number;
}

const CreateStageSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short')
        .max(100, 'Too long')
        .required('Required'),
    password: Yup.string().min(5, 'Please use minimum of 5 characters.').max(50, 'Please use maximum of 50 characters.'),
    width: Yup.number().min(0.1).max(1000),
    length: Yup.number().min(0.1).max(1000),
    height: Yup.number().min(0.1).max(1000),
    absorption: Yup.number().min(0.1).max(1),
    reflection: Yup.number().min(0.1).max(1),
});

const Label = styled('label', {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
})

const CreateStageModal = (props: {
    onClose?(): void;
}): JSX.Element => {
    const {onClose} = props;
    const [css] = useStyletron();
    const {createStage} = useStageActions();

    return (
        <Modal
            onClose={onClose}
        >
            <ModalHeader>
                <Headline variant="caption">Create new stage</Headline>
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
                validationSchema={CreateStageSchema}
                onSubmit={(values: Values) => {
                    createStage(
                        values.name,
                        values.password,
                        values.width,
                        values.length,
                        values.height,
                        values.damping,
                        values.absorption
                    );
                    props.onClose();
                }}
            >
                <Form>
                    <ModalBody>
                        <Table>
                            <HalfColumn>
                                <Label htmlFor="name">
                                    Stage name
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="name"
                                    type="text"
                                    name="name"
                                />
                            </HalfColumn>

                            <HalfColumn>
                                <Label htmlFor="password">
                                    Passwort (optional)
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="password"
                                    type="password"
                                    name="password"
                                />
                            </HalfColumn>

                            <FullColumn>
                                <Headline variant="h2">Stage dimension</Headline>
                            </FullColumn>

                            <HalfColumn>
                                <Label htmlFor="width">
                                    Width
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="width"
                                    type="width"
                                    name="width"
                                />
                            </HalfColumn>

                            <HalfColumn>
                                <Label htmlFor="length">
                                    Length
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="length"
                                    type="length"
                                    name="length"
                                />
                            </HalfColumn>

                            <HalfColumn>
                                <Label htmlFor="height">
                                    Height
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="height"
                                    type="height"
                                    name="height"
                                />
                            </HalfColumn>

                            <HalfColumn>
                                <Label htmlFor="damping">
                                    Damping
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="damping"
                                    type="damping"
                                    name="damping"
                                />
                            </HalfColumn>

                            <HalfColumn>
                                <Label htmlFor="absorption">
                                    Absorption
                                </Label>
                            </HalfColumn>
                            <HalfColumn>
                                <Field
                                    as={StyledInput}
                                    id="absorption"
                                    type="absorption"
                                    name="absorption"
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
            </Formik>
        </Modal>
    );
};
export default CreateStageModal;
