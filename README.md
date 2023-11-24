# SynthA! | A Modular Synth for the Web Generation
## Francesco Colotti, Jakub Votrubec, Roos Zoutman
## CS-E4400 - Design of WWW Services (23/24)
Project intro here.

Some random informations:
* I (Francesco) have decided that for simplicity all nodes accept only one input per port (except for audio out nodes) and only one output per port. This is to keep the implementations simple, and also because in practice, even with a physical modular synthesiser, it's rare to send the same output port to two input ports (there are precise cables to do that). To account for this, I'll think about adding an "output duplicator" block.  

Key challenges here:

Key learning moments here:



## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
