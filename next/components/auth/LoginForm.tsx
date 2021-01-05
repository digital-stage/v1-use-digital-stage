import React, {useCallback, useState} from 'react';
import {styled} from 'styletron-react';
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import {Field, Form, Formik, FormikProps} from 'formik';
import Input from '../theme/Input';
import * as Yup from "yup";
import {useIntl} from "react-intl";
import Notification from "../theme/Notification";
import Button from '../theme/Button';

const StyledForm = styled(Form, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const StyledInput = styled(Input, {
    width: '100%'
})

const LoginForm = () => {
    const auth = useAuth();
    const [error, setError] = useState<string>();
    const {push} = useRouter();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

    const handleSubmit = useCallback(
        (values, actions) => {
            if (auth) {
                auth
                    .signInWithEmailAndPassword(
                        values.email,
                        values.password
                    )
                    .then(() => push("/"))
                    .catch((loginError) => setError(loginError.message));
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
            })}
        >
            {(props: FormikProps<any>) => (
                <StyledForm autoComplete="on">
                    <Field
                        as={StyledInput}
                        label={f('emailAddress')}
                        type="text"
                        name="email"
                        autoComplete="email"
                        valid={!!props.errors.email}
                        notification={props.errors.email}
                        maxLength={20}
                    />
                    <Field
                        as={StyledInput}
                        label={f('password')}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        valid={!!props.errors.password}
                        notification={props.errors.password}
                        maxLength={30}
                    />
                    {error && (
                        <Notification>
                            {error}
                        </Notification>
                    )}
                    <Button type="submit">{f('doLogin')}</Button>
                </StyledForm>
            )}
        </Formik>
    );
};
export default LoginForm;
