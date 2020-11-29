import React from "react";
import {Provider as StyletronProvider} from 'styletron-react'
import {DigitalStageProvider} from "../../dist";
import {debug, styletron} from "../styletron";
import './../styles.css'
import StatusInformer from "../components/StatusInformer";
import {AuthConsumer, AuthProvider} from "../lib/useAuth";
import Head from 'next/head';
import StageOrMixerToggle from "../components/global/StageOrMixerToggle";
import {StageWebAudioProvider} from "../lib/useStageWebAudio";
import {AudioContextProvider} from "../lib/useAudioContext";
import StartPlaybackInformer from "../components/StartPlaybackInformer";
import {ErrorsConsumer, ErrorsProvider} from "../lib/useErrors";
import StageJoiner from "../components/StageJoiner";
import {StageJoinerProvider} from "../lib/useStageJoiner";
import WebcamToggle from "../components/global/WebcamToggle";
import MicrophoneToggle from "../components/global/MicrophoneToggle";

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
                                authUrl={process.env.NEXT_PUBLIC_AUTH_URL}
                            >
                                <AuthConsumer>
                                    {({token}) => (
                                        <DigitalStageProvider
                                            apiUrl={process.env.NEXT_PUBLIC_API_URL}
                                            routerDistUrl={process.env.NEXT_PUBLIC_ROUTERS_URL}
                                            token={token}
                                            addErrorHandler={reportError}
                                        >
                                            <AudioContextProvider>
                                                <StageWebAudioProvider>
                                                    <StageJoinerProvider>
                                                        <Component {...pageProps} />
                                                        <StageOrMixerToggle/>
                                                        <WebcamToggle/>
                                                        <MicrophoneToggle/>
                                                        <StartPlaybackInformer/>
                                                        <StageJoiner/>
                                                        <StatusInformer/>
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
            </StyletronProvider>
        </>
    );
}

export default MyApp
