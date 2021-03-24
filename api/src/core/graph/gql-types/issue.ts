/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const issue = ` 
	type Issue {
		code: String
		type: String
		typeCode: Int
		message: String
		context: String
		selector: String
		runner: String
		issue: String
		issues(filter: String): [Issue]
		url: String
		domain: String
		pageUrl: String
	}
`;
