import { useRouter } from 'next/router';
import React from 'react';
import ActivationPane from "../../components/auth/ActivationPane";
import Layout from "../../components/global/Layout";

const Activate = (): JSX.Element => {
  const { query } = useRouter();

  const initialCode = Array.isArray(query.code) ? query.code[0] : query.code;

  return (
    <Layout>
        <ActivationPane initialCode={initialCode} />
    </Layout>
  );
};

export default Activate;
