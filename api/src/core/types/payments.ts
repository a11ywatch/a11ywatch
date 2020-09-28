/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const payments = `

	type PaymentPlan {
		id: String
		object: String
		active: Boolean
		amount: Int
		amount_decimal: String
		nickname: String
		currency: String
		interval: String
		product: String
	}

	type PaymentSubScription {
		id: String
		object: String
		application_fee_percent: Int
		billing_cycle_anchor: Int
		cancel_at_period_end: Boolean
		customer: String
		ended_at: String
		canceled_at: String
		status: String
		start_date: String
		plan: PaymentPlan
		days_until_due: String
		current_period_end: String
		current_period_start: String
		created: String
		collection_method: String
	}

`;
