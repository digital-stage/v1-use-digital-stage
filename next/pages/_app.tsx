import React from "react";
import {Provider as StyletronProvider} from 'styletron-react'
import {DigitalStageProvider} from "../..";
import {styletron, debug} from "../styletron";


function MyApp({Component, pageProps}) {
    return (
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
            <DigitalStageProvider
                apiUrl="wss://api.digital-stage.org"
                authUrl="https://auth.digital-stage.org"
                routerDistUrl="https://routers.digital-stage.org"
                debugRedux={true}
            >
                <Component {...pageProps} />
            </DigitalStageProvider>
        </StyletronProvider>
    );
}

export default MyApp
