/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ReactDOM from './src/client/ReactDOM';

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
export default (ReactDOM.default ? ReactDOM.default : ReactDOM);
