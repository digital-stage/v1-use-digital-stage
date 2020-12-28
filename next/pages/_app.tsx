import React from "react";
import {Provider as StyletronProvider} from 'styletron-react'
import {DigitalStageProvider} from "use-digital-stage";
import {debug, styletron} from "../styletron";
import './../styles.css'
import StatusInformer from "../components/StatusInformer";
import {AuthConsumer, AuthProvider} from "../lib/useAuth";
import Head from 'next/head';
import {StageWebAudioProvider} from "../lib/useStageWebAudio";
import {AudioContextProvider} from "../lib/useAudioContext";
import StartPlaybackInformer from "../components/StartPlaybackInformer";
import {ErrorsConsumer, ErrorsProvider} from "../lib/useErrors";
import StageJoiner from "../components/StageJoiner";
import {StageJoinerProvider} from "../lib/useStageJoiner";
import {ColorProvider} from "../lib/useColors";
import AppNavigation from "../components/global/AppNavigation";
import {ModalInjector, ModalProvider} from "../lib/useModal";
import {IntlProvider} from "react-intl";
import {useRouter} from "next/router";
import * as locales from "../content/locale"


function MyApp({Component, pageProps}) {
    const router = useRouter()
    const {locale, defaultLocale} = router
    const localeCopy = locales[locale]
    const messages = localeCopy["default"]

    console.log(messages);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
                <IntlProvider
                    locale={locale}
                    defaultLocale={defaultLocale}
                    messages={messages}
                >
                    <ErrorsProvider>
                        <ErrorsConsumer>
                            {({reportError}) => (
                                <AuthProvider
                                    authUrl={process.env.NEXT_PUBLIC_AUTH_URL}
                                >
                                    <AuthConsumer>
                                        {({token}) => (
                                            <DigitalStageProvider
                                                apiUrl={process.env.NEXT_PUBLIC_API_URL}
                                                routerDistributorUrl={process.env.NEXT_PUBLIC_ROUTER_DISTRIBUTOR_URL}
                                                standaloneRouterUrl={process.env.NEXT_PUBLIC_ROUTER_DISTRIBUTOR_URL ? undefined : process.env.NEXT_PUBLIC_ROUTER_URL}
                                                token={token}
                                                addErrorHandler={reportError}
                                            >
                                                <AudioContextProvider>
                                                    <StageWebAudioProvider handleError={reportError}>
                                                        <StageJoinerProvider>
                                                            <ModalProvider>
                                                                <ColorProvider>
                                                                    <Component {...pageProps} />
                                                                </ColorProvider>
                                                                <StartPlaybackInformer/>
                                                                <StageJoiner/>
                                                                <AppNavigation/>
                                                                <StatusInformer/>
                                                                <ModalInjector/>
                                                            </ModalProvider>
                                                        </StageJoinerProvider>
                                                    </StageWebAudioProvider>
                                                </AudioContextProvider>
                                            </DigitalStageProvider>
                                        )}
                                    </AuthConsumer>
                                </AuthProvider>
                            )}
                        </ErrorsConsumer>
                    </ErrorsProvider>
                </IntlProvider>
            </StyletronProvider>
        </>
    );
}

export default MyApp
