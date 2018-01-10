import React from './src/React';
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.

export default React;
export const Children = React.Children;
export const Component = React.Component;
export const PureComponent = React.PureComponent;
export const Fragment = React.Fragment;
export const createElement = React.createElement;
export const cloneElement = React.cloneElement;
export const createFactory = React.createFactory;
export const isValidElement = React.isValidElement;
