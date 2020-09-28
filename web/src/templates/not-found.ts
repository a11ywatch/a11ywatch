/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const WEBSITE_NOT_FOUND_TEMPLATE: string = `
<div style="padding:12px; color: #121212;">
<h1>Error</h1>
<h2>Website not found, please check your url and try again.</h2>
<button onclick="window.history.back()">Go Back</button>
</div>
`

export { WEBSITE_NOT_FOUND_TEMPLATE }
