/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const query = `
	type Query {
		features: [Feature]
		websites(filter: String): [Website]
		website(url: String): Website
		subDomains(filter: String): [SubDomain]
		issues(filter: String): [Issue]
		history(filter: String): [History]
		analytics(filter: String): [Analytic]
		scripts(filter: String): [Script]
		script(filter: String, url: String): Script
		issue(url: String): Issue
		user: User
	}
`;
