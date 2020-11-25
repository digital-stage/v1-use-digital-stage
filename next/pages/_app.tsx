import React from "react";
import {Provider as StyletronProvider} from 'styletron-react'
import {DigitalStageProvider} from "../..";
import {debug, styletron} from "../styletron";
import './../styles.css'
import AppBar from "../components/AppBar";
import Wrapper from "../components/ui/Wrapper";
import StatusInformer from "../components/StatusInformer";
import {AuthContextConsumer, AuthContextProvider} from "../lib/useAuth";

function MyApp({Component, pageProps}) {
    return (
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
            <AuthContextProvider
                authUrl="https://auth.digital-stage.org"
            >
                <AuthContextConsumer>
                    {({token}) => (
                        <DigitalStageProvider
                            apiUrl="wss://api.digital-stage.org"
                            routerDistUrl="https://routers.digital-stage.org"
                            token={token}
                        >
                            <AppBar/>
                            <Wrapper>
                                <Component {...pageProps} />
                            </Wrapper>
                            <StatusInformer/>
                        </DigitalStageProvider>
                    )}
                </AuthContextConsumer>
            </AuthContextProvider>
        </StyletronProvider>
    );
}

export default MyApp
