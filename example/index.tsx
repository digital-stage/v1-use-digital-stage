import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DigitalStageProvider, useDigitalStage} from "../.";

const Component = () => {
    const auth = useDigitalStage();
    return (
        <div>
            {auth.ready ? "READY" : "NOT READY"}
        </div>
    )
}

const App = () => {
    return (
        <>
            <h1>useDigitalStage</h1>
            <DigitalStageProvider
                authUrl="https://auth.digital-stage.org"
                apiUrl="https://api.digital-stage.org"
            >
                <Component/>
            </DigitalStageProvider>
        </>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
