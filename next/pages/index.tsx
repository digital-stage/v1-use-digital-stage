import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useAuth from "../lib/useAuth";
import {useStyletron} from "styletron-react";
import WelcomeLayout from "../components/theme/WelcomeLayout";
import {useIntl} from "react-intl";
import Headline from "../components/theme/Headline";
import Button from "../components/theme/Button";
import Link from "next/link";

const Index = () => {
    const auth = useAuth();
    const {push} = useRouter();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});
    const [css] = useStyletron();

    useEffect(() => {
        if (!auth.loading && auth.user) {
            push("/stages")
        }
    }, [push, auth]);

    return (
        <WelcomeLayout>
            <Headline
                variant="h1">{f("welcome")}</Headline>
            <Link href="/auth/login">
                <Button $variant="white">{f("start")}</Button>
            </Link>
            <Headline
                className={css({
                    maxWidth: '260px',
                    textAlign: 'center'
                })}
                variant="h5"
            >{f("welcomeSubline")}</Headline>
        </WelcomeLayout>
    )
}
export default Index;
