# ecmascript-module-react

A test to see how far current browsers support the untranspiled source of React.
A native Ecmascript implementation of the development version of React.

The goal is to have an automated process which takes the source from the original react repo and transforms it into native Ecmascript modules to be used in a browser.


Steps that are currently done:
* based on the urls that are passed in as CLI arguments find out what modules are all ```import```ed or ```require```d
* remove flow hints
* copy all files to an output folder
* make all imports paths absolute
* remove `import { HostConfig, Deadline, Reconciler } from './src/ReactFiberReconciler';` from /input/react-reconciler/index.js
* transform CommonJS modules to Native Ecmascript modules (fbjs, prop-types and practically all index.js files)
* make proxy module for Object.assign which exports an assign variable
* make global variables ```window.process``` and ```window.__DEV__```
* export the properties of the React object as named exports and the React object as default
