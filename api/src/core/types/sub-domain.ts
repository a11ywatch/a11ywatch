/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const subdomain = `
	type SubDomain {
		id: ID
		url: String
		user: User
		domain: String
		userId: Int
		adaScore: Float
		cdnConnected: Boolean
		pageLoadTime: PageLoadTimeMeta
		html: String
		htmlIncluded: Boolean
		issues(filter: String): [Issue]
		issuesInfo: IssueMeta
	}
`;
