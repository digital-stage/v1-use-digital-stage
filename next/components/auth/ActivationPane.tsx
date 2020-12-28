import React, { useCallback, useEffect, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import useAuth from "../../lib/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Notification from "../ui/Notification";

export interface Values {
  code: string;
}

const Schema = Yup.object().shape({
  code: Yup.string().length(40).required('Aktivierungscode wird benötigt'),
});

const ActivationPane = (props: { initialCode?: string }): JSX.Element => {
  const { initialCode } = props;
  const { push } = useRouter();
  const [message, setMessage] = useState<{
    type: 'danger' | 'warning' | 'info' | 'success';
    content: string;
  }>();
  const { loading, user, activate } = useAuth();

  const handleActivation = useCallback(
    (code: string) => {
      setMessage(undefined);
      return activate(code)
        .then(() => {
          setMessage({
            type: 'success',
            content: 'Account erfolgreich aktiviert',
          });
          setTimeout(() => {
            push('/');
          }, 1000);
        })
        .catch((error) => {
          setMessage({
            type: 'danger',
            content: error,
          });
        });
    },
    [activate, push]
  );

  useEffect(() => {
    if (initialCode) handleActivation(initialCode);
  }, [initialCode, handleActivation]);

  useEffect(() => {
    if (!loading && user) {
      push('/');
    }
  }, [loading, user, push]);

  const notification = message ? <Notification>{message.content}</Notification> : null;

  return (
    <div>
      {notification}
      <Formik
        initialValues={{
          code: '',
        }}
        validationSchema={Schema}
        onSubmit={(values: Values, { resetForm }: FormikHelpers<Values>) => {
          return handleActivation(values.code).then(() => resetForm(null));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={Input}
              id="code"
              label="Aktivierungscode"
              type="text"
              name="code"
              error={errors.code && touched.code}
            />
              <Button>Account aktivieren</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ActivationPane;
