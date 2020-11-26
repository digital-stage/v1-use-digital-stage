import React from "react";
import {Provider as StyletronProvider} from 'styletron-react'
import {DigitalStageProvider} from "../..";
import {debug, styletron} from "../styletron";
import './../styles.css'
import StatusInformer from "../components/StatusInformer";
import {AuthConsumer,  AuthProvider} from "../lib/useAuth";
import Head from 'next/head';
import StageOrMixerToggle from "../components/navigation/StageOrMixerToggle";
import StageWebAudioProvider from "../lib/useStageWebAudio";
import {AudioContextProvider} from "../lib/useAudioContext";
import StartPlaybackInformer from "../components/StartPlaybackInformer";
import {ErrorsConsumer, ErrorsProvider} from "../lib/useErrors";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </Head>
            <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
                <ErrorsProvider>
                    <ErrorsConsumer>
                        {({reportError}) => (
                            <AuthProvider
                                authUrl="https://auth.digital-stage.org"
                            >
                                <AuthConsumer>
                                    {({token}) => (
                                        <DigitalStageProvider
                                            apiUrl="wss://api.digital-stage.org"
                                            routerDistUrl="https://routers.digital-stage.org"
                                            token={token}
                                            addErrorHandler={reportError}
                                        >
                                            <AudioContextProvider>
                                                <StageWebAudioProvider>
                                                    <Component {...pageProps} />
                                                    <StageOrMixerToggle/>
                                                    <StartPlaybackInformer/>
                                                    <StatusInformer/>
                                                </StageWebAudioProvider>
                                            </AudioContextProvider>
                                        </DigitalStageProvider>
                                    )}
                                </AuthConsumer>
                            </AuthProvider>
                        )}
                    </ErrorsConsumer>
                </ErrorsProvider>
            </StyletronProvider>
        </>
    );
}

export default MyApp
