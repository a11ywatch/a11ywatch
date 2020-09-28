/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const script = `
	type Script {
		id: ID
		pageUrl: String
		domain: String
		script: String
		cdnUrl: String
		cdnUrlMinified: String
		googleTranslateInclude: Boolean
		cdnConnected: Boolean
		issueMeta: IssueMeta
		scriptMeta: ScriptMeta
	}
`;
