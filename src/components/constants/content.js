export const contentTypes = {
  PDF: 'PDF',
  PRS: 'Deck',
  VID: 'Video',
  POD: 'Podcast',
  CUS: 'Custom',
  LNK: 'LNK',
  ALL: 'ALL',
};

// export const contentTypes = {
//   PDF: 'PDF',
//   PRS: 'PRS',
//   VID: 'VID',
//   POD: 'POD',
//   DAM: 'DAM',
//   CUS: 'CUS',
//   LNK: 'LNK',
//   ALL: 'ALL',
//   SHOP: 'SHOP',
// };

export const pdfPlayerTypes = {
  NONE: 'none',
  EMBED: 'embed',
  ADOBE: 'adobe',
  NATIVE: 'native',
};

export const avPlayerTypes = {
  NONE: 'none',
  EMBED: 'embed',
  NATIVE: 'native',
};

export const slideTypes = {
  SLIDE: 'SLIDE',
  PDF: 'PDF',
  VID: 'VID',
  POD: 'POD',
  TRN: 'TRANSITION',
  TITLE: 'TITLE',
};

export const contentZones = {
  US: 'US',
  EU: 'EU',
  JPN: 'JPN',
  APAC: 'APAC',
  ME: 'ME',
};

export const defaultCountryAbbreviations = {
  ALL: 'ALL',
  US: 'US',
  EU: 'EU',
  JP: 'JP',
};

// this is out of date, but not used
export const languageCodes = {
  ALL: 'all',
  CZ: 'cz',
  DA: 'da',
  DE: 'de',
  EN: 'en',
  ES: 'es',
  FN: 'fn',
  FR: 'fr',
  IT: 'it',
  JA: 'ja',
  NL: 'nl',
  NO: 'no',
  PT: 'pt',
  PL: 'pl',
  SV: 'sv',
  UK: 'uk',
};

export const categoryContentDisplayMode = {
  DISPLAY_MODE_LARGE_THUMBS: 'large-thumbs',
  DISPLAY_MODE_ENHANCED_ITEMS: 'enhanced-items',
  DISPLAY_MODE_DETAILED_ITEMS: 'detailed-items',
};

export const categoryContentSortMode = {
  SORT_MODIFIED_DATE_ASC: 'sort-modified-asc',
  SORT_MODIFIED_DATE_DESC: 'sort-modified-desc',
  SORT_ALPHA_TITLE_ASC: 'sort-title-asc',
  SORT_ALPHA_TITLE_DESC: 'sort-title-desc',
  SORT_VIEWS_ASC: 'sort-views-asc',
  SORT_VIEWS_DESC: 'sort-views-desc',
  SORT_SEARCH_RELEVANCE: 'sort-search-relevance',
  SORT_RECENTLY_VIEWED: 'sort-recently-viewed',
  SORT_DEFAULT: 'sort-modified-desc'
};

export const categoryContentSortModeLabels = {
  [categoryContentSortMode.SORT_MODIFIED_DATE_ASC]: 'S_LEAST_RECENT',
  [categoryContentSortMode.SORT_MODIFIED_DATE_DESC]: 'S_MOST_RECENT',
  [categoryContentSortMode.SORT_ALPHA_TITLE_ASC]: 'S_SORT_ALPHABETICAL_ASC',
  [categoryContentSortMode.SORT_ALPHA_TITLE_DESC]: 'S_SORT_ALPHABETICAL_DESC',
  [categoryContentSortMode.SORT_VIEWS_ASC]: 'S_SORT_VIEWS_ASC',
  [categoryContentSortMode.SORT_VIEWS_DESC]: 'S_SORT_VIEWS_DESC',
  [categoryContentSortMode.SORT_SEARCH_RELEVANCE]: 'S_BY_RELEVANCE',
  [categoryContentSortMode.SORT_RECENTLY_VIEWED]: 'S_MOST_RECENTLY_VIEWED',
};


// Some of these are used by sections
export const categorySlugs = {
  ADDITIONAL_MATCHES: 'additional_matches',
  ALL_CONTENT: 'all-content',
  ALL_CUSTOMS: 'all-customs',
  ALL_DECKS: 'all-decks',
  ALL_LINKS: 'all-links',
  ALL_PDFS: 'all-pd-fs',
  ALL_PODCASTS: 'all-podcasts',
  ALL_PRINTSHOP: 'all-printshop',
  ALL_VIDEOS: 'all-videos',
  CUSTOM_PRESENTATIONS: 'custom-presentations',
  DAM: 'dam',
  DAM_RECENTLY_ADDED: 'd-recently-added',
  DAM_SEARCH_RESULTS: 'd-search-results',
  DASHBOARD: 'dashboard',
  HOME: 'home-section',
  MY_CUSTOMS: 'my-customs',
  MY_STUFF: 'my-stuff',
  SHARED_CUSTOMS: 'customs-shared',
  CREATE_CUSTOM: 'create-custom',
  FAVORITES: 'favorites',
  RECENTLY_ADDED: 'recently-added',
  RECENTLY_VIEWED: 'recently-viewed',
  RELATED_ITEMS: 'related-items',
  SEARCH_RESULTS: 'search-results',
  TRENDING_ITEMS: 'trending-items',
  REPORTS: 'reports',
  CART: 'cart',
  SETTINGS: 'settings',
  ACE_POD: 'ace-pod',
  ACE_POD_FEATURED: 'acepod-featured',
  ACE_POD_NEWLY_ADDED: 'acepod-newitems',
  WEEKLY_UPDATE: 'weekly-update',
  FEATURED: 'featured',
};


export const contentTypeCategorySlugs = {
  [contentTypes.PDF]: categorySlugs.ALL_PDFS,
  [contentTypes.PRS]: categorySlugs.ALL_DECKS,
  [contentTypes.VID]: categorySlugs.ALL_VIDEOS,
  [contentTypes.LNK]: categorySlugs.ALL_LINKS,
  [contentTypes.POD]: categorySlugs.ALL_PODCASTS,
  [contentTypes.CUS]: categorySlugs.ALL_CUSTOMS,
  [contentTypes.ALL]: categorySlugs.ALL_CONTENT,
};

const metaCategories = [
  categorySlugs.SEARCH_RESULTS,
  categorySlugs.RECENTLY_ADDED,
  categorySlugs.RECENTLY_VIEWED,
  categorySlugs.FAVORITES,
  categorySlugs.CART,
  categorySlugs.REPORTS,
  categorySlugs.SETTINGS,
  categorySlugs.TRENDING_ITEMS,
  categorySlugs.ALL_CONTENT,
  categorySlugs.ACE_POD_FEATURED,
  categorySlugs.ACE_POD_NEWLY_ADDED,
];
export const isMetaCategory = category => !!category && metaCategories.includes(category.slug);

export const contentTypeCategories = [
  categorySlugs.ALL_CONTENT,
  categorySlugs.ALL_CUSTOMS,
  categorySlugs.ALL_DECKS,
  categorySlugs.ALL_LINKS,
  categorySlugs.ALL_PDFS,
  categorySlugs.ALL_PODCASTS,
  categorySlugs.ALL_VIDEOS,
];

export const contentTypeCategoryStrings = {
  [categorySlugs.ALL_CONTENT]: 'S_ALL_CONTENT',
  [categorySlugs.ALL_CUSTOMS]: 'S_ALL_CUSTOMS',
  [categorySlugs.ALL_DECKS]: 'S_ALL_DECKS',
  [categorySlugs.ALL_LINKS]: 'S_ALL_LINKS',
  [categorySlugs.ALL_PDFS]: 'S_ALL_PDFS',
  [categorySlugs.ALL_PODCASTS]: 'S_ALL_PODCASTS',
  [categorySlugs.ALL_VIDEOS]: 'S_ALL_VIDEOS',
};
export const isContentTypeCategory = category => !!category && contentTypeCategories.includes(category.slug);

const nonSearchableCategories = [
  categorySlugs.FEATURED,
  categorySlugs.WEEKLY_UPDATE,
  categorySlugs.TRENDING_ITEMS,
  categorySlugs.RECENTLY_ADDED,
  categorySlugs.RECENTLY_VIEWED,
  categorySlugs.CART,
];
export const isSearchableCategory = category => !!category && !nonSearchableCategories.includes(category.slug);

export const obsoleteCategories = [
  categorySlugs.DASHBOARD,
];

export const homeSectionCategories = [
  categorySlugs.HOME,
  categorySlugs.FEATURED,
  categorySlugs.WEEKLY_UPDATE,
  categorySlugs.TRENDING_ITEMS,
  categorySlugs.RECENTLY_ADDED,
  categorySlugs.RECENTLY_VIEWED,
  ...obsoleteCategories,
  ...contentTypeCategories,
];

export const myStuffCategories = [
  categorySlugs.MY_STUFF,
  categorySlugs.FAVORITES,
  categorySlugs.CART,
  categorySlugs.REPORTS,
  categorySlugs.CUSTOM_PRESENTATIONS,
];

export const inCategorySlugList = (slug, categorySlugList) => slug && categorySlugList.some(aSlug => slug.indexOf(aSlug) >= 0);


export const defaultSectionTabExclusions = [
  categorySlugs.DAM,
  categorySlugs.ACE_POD,
];

export const customSlideIds = {
  MISSING: 'missing',
  CUSTOM: 'custom',
};

export const contentItemActions = {
  ITEM_NULL: 0,
  ITEM_EDIT: 1,
  ITEM_EMAIL: 2, // deprecated
  ITEM_PRINT: 3,
  ITEM_SHARE_WITH_CUSTOMERS: 4,
  ITEM_DELETE: 5,
  ITEM_PUSH_LIVE: 6,
  ITEM_CUSTOMIZE: 7,
  ITEM_GO_TO_CATEGORY: 8,
  ITEM_SHOW_DRAW_MENU: 9,
  ITEM_ADD_TO_FAVORITES: 10,
  ITEM_REMOVE_FROM_FAVORITES: 11,
  ITEM_ADD_TO_CART: 12,
  ITEM_REMOVE_FROM_CART: 13,
  ITEM_CLEAR_CART: 14,
  ITEM_ADD_LIKE: 15,
  ITEM_REMOVE_LIKE: 16,
  ITEM_DOWNLOAD: 17,
  ITEM_NO_DOWNLOAD: 18,
  ITEM_SHARE_CART: 19,
  ITEM_ADD_TO_QUEUE: 20,
  ITEM_REMOVE_FROM_QUEUE: 21,
  ITEM_SHARE_CONTENT_URL: 22,
  ITEM_SHARE_ACE_POD_CONTENT_URL: 23, // deprecated
  ITEM_SHARE_MULTIPLE_CUSTOMS: 24,
  ITEM_MORE_OPTIONS: 25,
  ITEM_SEND_TO_PRINTSHOP: 26,
};

export const contentTypeLabels = {
  [contentTypes.ALL]: 'S_ALL_TYPES',
  [contentTypes.PRS]: 'S_DECKS',
  [contentTypes.PDF]: 'S_PDFS',
  [contentTypes.VID]: 'S_VIDEOS',
  [contentTypes.LNK]: 'S_LINKS',
  [contentTypes.POD]: 'S_PODCASTS',
  [contentTypes.CUS]: 'S_CUSTOMS',
};

export const timeSpanLabels = {
  // 1: 'S_TODAY',
  7: 'S_LAST_7_DAYS',
  30: 'S_LAST_30_DAYS',
  90: 'S_LAST_3_MONTHS',
  180: 'S_LAST_6_MONTHS',
  365: 'S_LAST_12_MONTHS',
  // '-1': 'S_YEAR_TO_DATE',
  0: 'S_ALL_TIME',
};

export const contentExposures = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  ALL: 'all',
  ACE_POD: 'ace-pod', // psuedo-exposure
};

export const contentSpaces = {
  ANY: 'any',
  INTERNAL: 'internal',
  CUSTOMER_FACING: 'customer-facing',
  ACE_POD: 'ace-pod',
};

export const contentSpaceNames = {
  [contentSpaces.INTERNAL]: 'S_INTERNAL',
  [contentSpaces.CUSTOMER_FACING]: 'S_CUSTOMER_FACING',
  [contentSpaces.ACE_POD]: 'S_ACE_POD',
};

export const exposureNavItems = {
  [contentSpaces.CUSTOMER_FACING]: {
    linkTo: `/content`,
    className: showBorder => showBorder ? 'first-link' : 'first-link hide-border',
  },
  [contentSpaces.INTERNAL]: {
    linkTo: `/content?${contentExposures.INTERNAL}`,
    className: showBorder => showBorder ? 'second-link' : 'second-link hide-border',
  },
  [contentSpaces.ACE_POD]: {
    linkTo: `/ace-pod/?${contentExposures.INTERNAL}`,
    className: () => 'second-link hide-border',
  },
};


export const headerMenuItemTypes = {
  VIEW_MODE: 'VIEW_MODE',
  SORT_MODE: 'SORT_MODE',
};

export const getCategoryDefaultSortMode = (category) => {
  if (!category) {
    return categoryContentSortMode.SORT_DEFAULT;
  }

  const { slug } = category;
  if (slug === categorySlugs.SEARCH_RESULTS) {
    return categoryContentSortMode.SORT_SEARCH_RELEVANCE;
  }
  if (slug === categorySlugs.RECENTLY_VIEWED) {
    return categoryContentSortMode.SORT_RECENTLY_VIEWED;
  }
  return categoryContentSortMode.SORT_DEFAULT;
};

export function includeCountries(countries, item) {
  // 'item' can be a Slide or VaultItem, or anything with a 'country' property
  if (!item || !Object.hasOwnProperty.call(item, 'country') || !item.country) {
    return false;
  }
  return item.country.some(countryCode => countries.includes(countryCode));
}

// regex to determine if first character is Japanese
export const jpnRegex = /^([\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B)/g;

