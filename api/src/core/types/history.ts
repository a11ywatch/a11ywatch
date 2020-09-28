/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const history = `
	type History {
		id: ID
		url: String
		user: User
		issues(filter: String): [Issue]
		subDomains: [SubDomain]
		userId: Int
		domain: String
		adaScore: Float
		html: String
		htmlIncluded: Boolean
		cdnConnected: Boolean
		pageLoadTime: PageLoadTimeMeta
		issuesInfo: IssueMeta
	}
`;
