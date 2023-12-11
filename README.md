## PWA Todo App

The progressive web application that build by React & TypeScript & Vite.

And also using Docker & Docker Compose in development.

<img src="https://github.com/Bear29ers/pwa-todo/assets/39920490/6683ab3b-181b-4a13-8f6d-272d29201a07" width="300" />
<img src="https://github.com/Bear29ers/pwa-todo/assets/39920490/a5653f77-384d-4d1e-ad80-2e7e640dba6e" width="300" />
<img src="https://github.com/Bear29ers/pwa-todo/assets/39920490/243aa437-262c-4dd7-ab09-870762a734c4" width="300" />
<img src="https://github.com/Bear29ers/pwa-todo/assets/39920490/37362f55-15a1-4282-8b29-4d614ce72d10" width="300" />

[Deployed App](https://pwa-todo-ten.vercel.app/)

### Prerequisite

- Node.js 16.0.0 or later
- React 16.8 or later
- A basic understanding of JavaScript

### Cloning the repositry

```bash
git clone https://github.com/Bear29ers/pwa-todo.git
```

### Install packages

```bash
npm i
```

### Start the app (with Docker)

```bash
npm run docker:start
```

The port will be 5173.

### Stop the app (with Docker)

```bash
npm run docker:stop
```

### Available commands

Running commands with npm `run [command]`

| command | description                                                    |
| ------- | -------------------------------------------------------------- |
| `dev`   | starts a development instance of the app on local (not docker) |
| `build` | build the app                                                  |
