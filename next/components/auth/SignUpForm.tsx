import React, {useCallback, useState} from 'react';
import {styled} from 'styletron-react';
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import Notification from "../ui/Notification";
import {useIntl} from "react-intl";
import {Field, Form, Formik, FormikProps} from "formik";
import * as Yup from "yup";
import Button from '../theme/Button';
import Input from '../theme/Input';

const StyledForm = styled(Form, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const StyledInput = styled(Input, {
    width: '100%'
})

const SignUpForm = () => {
    const auth = useAuth();
    const [error, setError] = useState<string>();
    const {push} = useRouter();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

    const handleSubmit = useCallback(
        (values, actions) => {
            if (auth) {
                auth
                    .createUserWithEmailAndPassword(
                        values.email,
                        values.password,
                        values.displayName
                    )
                    .then(() => push("/"))
                    .catch((err) => setError(err.message));
            }
        },
        [auth]
    );

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email(f('enterValidEmail'))
                    .required(f('emailRequired')),
                password: Yup.string()
                    .min(8, f('passwordMinLength'))
                    .required(f('passwordRequired')),
                displayName: Yup.string()
            })}
        >
            {(props: FormikProps<any>) => (
                <StyledForm autoComplete="on">
                    <Field
                        as={StyledInput}
                        label={f('emailAddress')}
                        type="text"
                        name="email"
                        valid={!!props.errors.email}
                        notification={props.errors.email}
                        maxLength={20}
                    />
                    <Field
                        as={StyledInput}
                        label={f('password')}
                        type="password"
                        name="password"
                        valid={!!props.errors.password}
                        notification={props.errors.password}
                        maxLength={30}
                    />
                    <Field
                        as={StyledInput}
                        label={f('displayName')}
                        type="text"
                        name="displayName"
                        valid={!!props.errors.displayName}
                        notification={props.errors.displayName}
                        maxLength={30}
                    />
                    {error && (
                        <Notification>
                            {error}
                        </Notification>
                    )}
                    <Button type="submit">{f('doSignUp')}</Button>
                </StyledForm>
            )}
        </Formik>
    );
};
export default SignUpForm;
