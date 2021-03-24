/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const analytic = `
	type Analytic {
		id: ID
		pageUrl: String
		errorCount: Int
		warningCount: Int
		noticeCount: Int
		errorOccurances: String
		userId: Int
		domain: String
		adaScore: Float
	}
`;
