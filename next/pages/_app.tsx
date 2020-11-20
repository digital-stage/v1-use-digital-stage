import React from "react";
import {Provider as StyletronProvider} from 'styletron-react'
import {DigitalStageProvider} from "../..";
import {styletron, debug} from "../styletron";
import './../styles.css'
import AppBar from "../components/AppBar";
import Wrapper from "../components/ui/Wrapper";
import StatusInformer from "../components/StatusInformer";

function MyApp({Component, pageProps}) {
    return (
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
            <DigitalStageProvider
                apiUrl="wss://api.digital-stage.org"
                authUrl="https://auth.digital-stage.org"
                routerDistUrl="https://routers.digital-stage.org"
            >
                <AppBar/>
                <Wrapper>
                    <Component {...pageProps} />
                </Wrapper>
                <StatusInformer/>
            </DigitalStageProvider>
        </StyletronProvider>
    );
}

export default MyApp
