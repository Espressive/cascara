![Cascara](docs/public/cascara_text.svg)

Espressive's Functional Design System

![CircleCI](https://img.shields.io/circleci/build/gh/Espressive/cascara/main)
![David](https://img.shields.io/david/dev/Espressive/cascara)

## Getting Started: End Users

Please use [the documentation site](https://cascara.design) for all information about Cascara and how to use it: https://cascara.design

> All other usage information in this repository is intended for contributors.

---

## Get Started: Docs

1. Clone the repository to your local machine (UX Team will use [Tower](https://www.git-tower.com/mac) to do this)
2. Open the repository in [VSCode](https://code.visualstudio.com/)
3. Open a new terminal to run some commands using Terminal > New Terminal or the shortut: <kbd>Ctrl</kbd> + <kbd>~</kbd>
4. In the terminal, install all dependencies by running the following command:

```bash
yarn install
```

> It is possible you may not have node or yarn installed on your system. If so, please follow the additional steps below to [Install NVM](#install-nvm) and [Install Yarn](#install-yarn) before coming back to try this step again.

5. To start the docs, run:

```bash
yarn docs start
```

6. Visit the following link in your browser to see the docs running locally: http://localhost:3000/
7. Edit any MDX files in `/packages/cascara/src` or in `/docs/src/mdx` and they will automatically reload 🎊

#### Install NVM

We need to install node. There are reasons we will likely have to change to different versions of Node at times. Therefore we should install Node Version Manager to allow us to switch versions easily.

0. Check if nvm is already installed

```bash
nvm version
```

> If the output of this command is `nvm: command not found`, proceed to install step 1. If the output of this command is some version number, you already have `nvm` installed and can proceed to step 3.

1. Run the CURL command in the terminal to install:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

2. Verify that `nvm` has been installed:

```bash
nvm version
```

3. If the output of the above command is `v14.5.0` you are done! 🎉
4. If not... set the current version of node to 14.5.0:

```bash
nvm install 14.5.0
nvm alias default 14.5.0
```

5. Go back to step 2 and verify the correct version of Node is installed

#### Install Yarn
