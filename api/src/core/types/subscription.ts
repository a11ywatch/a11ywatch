/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const subscription = `
	type Subscription {
		websiteAdded(userId: Int): Website
		issueAdded(userId: Int): Issue
		subDomainAdded(userId: Int): SubDomain
		emailVerified(userId: Int): User
		issueRemoved: Issue
		subDomainRemoved: SubDomain
		websiteRemoved: Website
	}
`;
