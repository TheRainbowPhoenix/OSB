import type { CurrencyCode, SupportedCurrencyCode, SupportedLocale } from '@namastay/constants';
import { getApiInstance } from './provider';

export type HotelProvider = 'synxis' | 'd-edge';

export type HotelTheme = {
	backgroundColor: string | null;
	borderColor: string | null;
	disabledColor: string | null;
	errorColor: string | null;
	fontFamily: string | null;
	infoColor: string | null;
	linkColor: string | null;
	pageSubtitleColor: string | null;
	pageTitleColor: string | null;
	primaryColor: string | null;
	secondaryColor: string | null;
	sectionDetailsBackgroundColor: string | null;
	sectionLightBackgroundColor: string | null;
	sectionSubtitleColor: string | null;
	sectionTitleColor: string | null;
	subtextColor: string | null;
	tertiaryColor: string | null;
	textColor: string | null;
};

export type HotelGuestRoom = {
	name: string;
	maxOccupancy: string;
	amenities: string[];
	features: string[];
	images: string[];
};

export type HotelLocale = {
	locale: SupportedLocale;
	isDefault: boolean;
};

export type HotelCurrency = {
	currency: SupportedCurrencyCode;
	isDefault: boolean;
};

export type HotelPhoneNumber = {
	type: string;
	number: string;
};

export type Contact = {
	phones: HotelPhoneNumber[];
	emails: string[];
};

export type HotelPaymentOption = {
	option: string;
};

type ScriptStrategy = 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';

type ScriptAttribute = 'async' | 'defer';

export type HotelScript = {
	src: string;
	attribute: ScriptAttribute;
	strategy: ScriptStrategy;
};

export type FeatureFlags = {
	hideCalendarPrices: boolean;
	collectPhoneNumber: boolean;
	hideIataInput: boolean;
};

export type HotelDetails = {
	acceptedPayments: string;
	bannerTextKey: string | null;
	bannerUrl: string | null;
	chainCode: string;
	checkInTime: string;
	checkOutTime: string;
	contact: Contact;
	currencies: HotelCurrency[];
	currencyCode: CurrencyCode;
	hotelCode: string;
	hotelCurrencyFromMetadata: CurrencyCode;
	name: string;
	hotelProvider: HotelProvider;
	locales: HotelLocale[];
	maxChildAge?: number;
	maxInfantAge?: number;
	maxOccupancyPerRoom: string;
	paymentOptions: HotelPaymentOption[];
	forcePayNowAddons: boolean;
	cvvRecaching: boolean;
	privacyPolicyUrl: string;
	synxisAreaId: string | null;
	theme: HotelTheme | null;
	scripts: HotelScript[];
	allowExpiredCards: boolean;
	featureFlags: FeatureFlags;
	includeTaxAmountInDisplayPrice: boolean;
};

export type ChainHotel = HotelDetails & {
	locales: HotelLocale[];
	currencies: HotelCurrency[];
};

export type GetHotelInfoResponse = {
	guestRooms: { [roomId: string]: HotelGuestRoom };
	hotelDetails: HotelDetails;
};

export const hotelApi = {
	getHotelInfo: async (lang: string, apiKey?: string): Promise<GetHotelInfoResponse> => {
		const { data } = await getApiInstance(apiKey).get(`/hotel`, {
			headers: { 'Accept-Language': lang }
		});
		return data;
	},
	getChainHotels: async (chainCode: string, apiKey?: string): Promise<ChainHotel[]> => {
		const { data } = await getApiInstance(apiKey).get(`/chain/${chainCode}/hotels`);
		return data;
	}
};
