/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const iframeStyles = `

.adaToolTip {
    height: 60px !important;
    width: 60px !important;
    padding: 0px !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
        Helvetica Neue, sans-serif !important;
    font-size: 16px !important;
    font-weight: 800 !important;
    border-radius: 30px !important;
    justify-content: center !important;
    align-items: center !important;
    display: flex !important;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    z-index: 999999 !important;
    float: left !important;
    position: absolute !important;
    border: 0px !important;
}

.adaToolTip:hover {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}


`
