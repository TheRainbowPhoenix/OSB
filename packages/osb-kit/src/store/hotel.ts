import { writable, derived, type Writable } from 'svelte/store';

export function effect(func, deps, options) {
	// options could be for example deepEqual check on deps
	// maybe we will even allow a cleanup function like useEffect (needed?)
	// deps is an array of stores, will be validated here
	const s = derived(deps, func);
	s.subscribe(() => {});
}

// type HotelStoreValues = {
// 	bannerTextKey: string | null;
// 	bannerUrl: string | null;
// 	hotelAcceptedPayments: string[];
// 	hotelChainCode: string;
// 	hotelCheckInTime: string;
// 	hotelCheckOutTime: string;
// 	hotelCode: string;
// 	hotelCurrencies: HotelCurrency[];
// 	hotelCurrencyCode?: CurrencyCode;
// 	hotelEmails: string[];
// 	hotelLocales: HotelLocale[];
// 	hotelMaxOccupancyPerRoom: number | null;
// 	hotelName: string;
// 	hotelPhoneNumbers: HotelPhoneNumber[];
// 	hotelPrivacyPolicyUrl: string;
// 	hotelProvider?: HotelProvider;
// 	isLoading: boolean;
// 	maxChildAge?: number;
// 	hotelForcePayNowAddons: boolean;
// 	hotelCvvRecaching: boolean;
// 	maxInfantAge?: number;
// 	hotelPaymentOptions?: HotelPaymentOption[];
// 	hotelScripts: HotelScript[];
// 	allowExpiredCards: boolean;
// 	hotelFeatureFlags: FeatureFlags;
// 	includeTaxAmountInDisplayPrice: boolean;
// };

const hotelStore: Writable<object> = writable({
	// INITIAL STATE
	hotelProvider: undefined,
	hotelName: '',
	hotelCode: '',
	hotelChainCode: '',
	hotelCurrencyCode: undefined,
	hotelCheckInTime: '',
	hotelCheckOutTime: '',
	hotelPrivacyPolicyUrl: '',
	hotelLocales: [],
	hotelCurrencies: [],
	hotelAcceptedPayments: [],
	hotelMaxOccupancyPerRoom: null,
	hotelPaymentOptions: [],
	hotelPhoneNumbers: [],
	hotelEmails: [],
	hotelForcePayNowAddons: false,
	hotelCvvRecaching: false,
	isLoading: false,
	bannerTextKey: '',
	bannerUrl: '',
	hotelScripts: [
		{
			src: '/science/lookup.js',
			attribute: 'async'
		}
	],
	allowExpiredCards: true,
	hotelFeatureFlags: {
		hideCalendarPrices: false,
		collectPhoneNumber: false,
		hideIataInput: false
	},
	includeTaxAmountInDisplayPrice: true
});

// Define other actions similarly...

export {
	hotelStore
	// Add other actions here...
};
