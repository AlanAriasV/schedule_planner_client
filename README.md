# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

/\*\*

- me quiero ir a dormir x
- hay que hacer el bloque de horas
- cómo?
- aah
- pero automatico xd
- creí que ibas a setearlo manualmente
- o sea aca nomas, despues hay que hacer query de eso yo creo.
- de las horas igual?
- si o no
- podria ser, pero no se si es necesario, al final es algo constante
- haces la query del server que sea este calculo
- ya pues
- pero eso lo veré maána
- alcanzaremos?
- mañana trataré de estar el mayor tiempo posible en esto
- yo creo que aunque no lleguemos a hacer el backend y le mopstramos que estamos rehaciendo todo
- igual se pone feliz
- no creo xd, esta wea de rehacer no estaba planeado por él
- jdsjsdj
-
- lo importante es la innovación qla
- estaba viendo, una integración de algo externo, será buena idea?
- tipo, que se pueda pasar el horario al calendario o algo así
- eso lo habíamos pensado o no?
- no recuerdo la verdad
- pero si, es buena idea
- mira copilot escribre por mi
- si xd
- por mí igual
- dsdsjdsjd
- ya intentemos hacer esa innovacion
- será que lo consulto con el profe?
- o sea, es algo tarde en fecha
- hagamoslo nomas
- para estar preguntando esa wea
- ya pues
- igual mañana volveré a mirar algunas ideas
- a ver si hay algo mejor
- ya
- entonces, me puedo ir a dormir?
- si xd ese xd me lo puso copilot
- djskdsdjksjk
- aprende rapido el ql xDDDDD
- esa wea lo puse él
- xD
- ya, me voy a dormir
- mañana nos vemos
- ya, chao
- chao
-
- eso puso
-
-
- xd
- la wea, creo que estamos entrenando mal al copilot
-
- que este chat se quede en el repo
- en el README
- si

  \*/
