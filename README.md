# Control Agent Demo

This demo utilized D-ID's `@d-id/agent-client` package.

## Run me

```sh
npm install
npm run dev
```

This will open a window under [http://localhost:5173](http://localhost:5173)

## Configurations

This project comes with a default agent.
In order to change it modify the following value in [.env](./.env):

- VITE_CLIENT_KEY
- VITE_AGENT_ID

## Callbacks and Functions

### Callbacks

`@d-id/agent-client` exposes several callbacks and functions.

Callbacks can be found and modified under [./src/index.tsx](./src/index.tsx):

- onStreamCreated - event containing information regarding the connection to the agent once its created
- onSttEnd - event containing stt result (after uses speaks)

### Functions

Functions represent internal logic that can be called from a wrapper code (like in this repo).  
All function calls will look like the following: `window.DID_AGENTS_API.functions.[function-name]`.  
The following is a list of functions:

```ts
speak: (type: 'text', 'input': '[your-text-here]') => void;
toggleMicState: (mute?: boolean) => void;
```

- speak - make the agent say something.
- toggleMicState - mute or unmute the user's mic (toggle if no new state is provided)
