# Digital Stage Hooks

## Installation

Install the hooks via

```bash
npm install use-digital-stage # or yarn install use-digital-stage
```

## Usage

In order to use the hook, you'll have to wrap the component or app using the hook with the DigitalStageProvider and specify the server urls, e.g.:

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {DigitalStageProvider} from "use-digital-stage"

function App() {
  return (
    <DigitalStageProvider
        apiUrl="wss://api.<your-domain>.tld"
        authUrl="https://auth.<your-domain>.tld"
    >
        <YourComponent />
    </DigitalStageProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
```
Then you can use the hook inside any functional component:

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import useDigitalStage from "use-digital-stage";

function MyComponent() {
  const {ready} = useDigitalStage();

  return (
    <div>
        Hello world, I'm {ready ? "ready" : "not ready"}!
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

Since we are rushing towards our first release at digital-stage.org, we are not able to provide any further documentation right now.
We are using typescript, so feel free to navigate through the type definitions inside this package.

Share love!
:green_heart:
