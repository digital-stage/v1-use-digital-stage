import {DigitalStageProvider} from "../..";

function MyApp({Component, pageProps}) {

    return (<DigitalStageProvider
        apiUrl="wss://api.digital-stage.org"
        authUrl="https://auth.digital-stage.org"
    >
        <Component {...pageProps} />
    </DigitalStageProvider>);
}

export default MyApp
