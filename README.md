# ecmascript-module-react

A native Ecmascript implementation of the development version of React

Steps done after all used modules are copied to the output folder:

* remove flow hints
* make all imports paths absolute
* remove `import { HostConfig, Deadline, Reconciler } from './src/ReactFiberReconciler';` from /input/react-reconciler/index.js
* transform CommonJS modules to Native Ecmascript modules (fbjs, prop-types and practically all index.js files)
* make proxy module for Object.assign which exports an assign variable
* make global variables window.process and window.**DEV**
