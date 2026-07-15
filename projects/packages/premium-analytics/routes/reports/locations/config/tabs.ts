/**
 * External dependencies
 */
import { defineReportTabs } from '@jetpack-premium-analytics/routing';
import { __ } from '@wordpress/i18n';

export type ReportLocationsTabId = 'countries' | 'regions' | 'cities';

const DEFAULT_TAB_ID: ReportLocationsTabId = 'countries';

const reportLocationsTabs = defineReportTabs< ReportLocationsTabId >(
	[
		{ id: 'countries', getLabel: () => __( 'Countries', 'jetpack-premium-analytics' ) },
		{ id: 'regions', getLabel: () => __( 'Regions', 'jetpack-premium-analytics' ) },
		{ id: 'cities', getLabel: () => __( 'Cities', 'jetpack-premium-analytics' ) },
	],
	DEFAULT_TAB_ID
);

/**
 * Build the ordered, translated Locations report tabs.
 */
export const getReportLocationsTabs = reportLocationsTabs.getTabs;

/**
 * Resolve a raw section value to a Locations report tab.
 */
export const resolveSection = reportLocationsTabs.resolve;
