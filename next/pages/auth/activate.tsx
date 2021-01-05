import { useRouter } from 'next/router';
import React from 'react';
import ActivationPane from "../../components/auth/ActivationPane";
import AuthLayout from "../../components/theme/AuthLayout";

const Activate = (): JSX.Element => {
  const { query } = useRouter();

  const initialCode = Array.isArray(query.code) ? query.code[0] : query.code;

  return (
    <AuthLayout>
        <ActivationPane initialCode={initialCode} />
    </AuthLayout>
  );
};

export default Activate;
