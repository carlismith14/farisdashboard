import { categoryContentDisplayMode, contentSpaces } from './content';

// These are copied from _variables.scss, which should go away someday
// 'mm' stands for 'Matt Marino', after 3.0, audit which colors are still used
export const abiomedColors = {
  blue: '#0260aa',
  blueHover: '#005fa9cc',
  gold: '#f9b719',
  gray: '#f2f2f2',
  darkGray: '#5a5a5a',
  internal: '#f15a24',
  internalHover: '#f15a24cc',
  royal: '#005fa9',
  mediumRoyal: '#125692',
  darkRoyal: '#123559',
  navy: '#0e355a',
  red: '#a40046',
  teal: '#309fa7',
  mint: '#47c1c5',
  forestGreen: '#045459',
  silver: '#8f9aa8',
  burntUmber: '#bb6023',
  header: '#0f3559',
  sidebar: '#0260aa',
  selected: 'rgba(173, 216, 230, 0.5)',
  podcastDark: '#102837',
  podcastLight: '#153F5C',
  relatedPopper: 'rgba(2, 96, 170, 0.75)',
  mmDarkNavy: '#07203d',
  mmGray: '#d9d9d9',
  mmHoverColor: '#064C86',
  mmPrimaryNavy: '#0e355a',
  mmPrimaryRoyal: '#005fa9',
  mmAccentBlue: '#193457',
  mmFadedGold: 'rgba(250, 182, 24, 0.20)',
  mmVeryDarkGray: '#333',
};

export const customSlideColors = {
  1: abiomedColors.royal,
  2: abiomedColors.gold,
};

export const printShopButton = {};

export const contentDrawerZIndex = 1300;

export const multilineTruncate = lines => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  display: '-webkit-box',
  '-webkit-line-clamp': lines,
  '-webkit-box-orient': 'vertical',
});

export const desktopGlobals = {
  bufferHeight: '32px',
  headerHeight: '98px',
  categoryHeaderHeight: '64px',
  [contentSpaces.INTERNAL]: {
    backgroundColor: abiomedColors.gold,
    headerColor: abiomedColors.mmDarkNavy,
  },
  [contentSpaces.CUSTOMER_FACING]: {
    backgroundColor: abiomedColors.mmDarkNavy,
    headerColor: 'white',
  },
  footerHeight: '48px',
  footerZIndex: 1298,
  sectionNavigationWidth: '310px',
  [categoryContentDisplayMode.DISPLAY_MODE_LARGE_THUMBS]: {
    containerWidth: '316px',
    iconSize: 'small',
  },
  [categoryContentDisplayMode.DISPLAY_MODE_ENHANCED_ITEMS]: {
    containerWidth: '100%',
    iconSize: 'large',
  },
  [categoryContentDisplayMode.DISPLAY_MODE_DETAILED_ITEMS]: {
    containerWidth: '100%',
    iconSize: 'large',
  },
};

export const mobileGlobals = {
  bufferHeight: '32px',
  [contentSpaces.INTERNAL]: {
    backgroundColor: abiomedColors.gold,
    headerColor: abiomedColors.mmDarkNavy,
    pageHeaderHeight: '80px',
    categoryHeaderHeight: '64px',
  },
  [contentSpaces.CUSTOMER_FACING]: {
    backgroundColor: abiomedColors.mmDarkNavy,
    headerColor: 'white',
    pageHeaderHeight: '60px',
    categoryHeaderHeight: '64px',
  },
  categoryHeaderHeight: '64px',
  miniPlayerHeight: '60px',
  tabBarHeight: '94px',
  filterHeight: '36px',
  footerZIndex: 1298,
  safeAreaTop: '47px',
  safeAreaBottom: '34px',
};

export const drawerStyles = {
  modalStyles: {
    bottom: {
      xs: `calc(${mobileGlobals.tabBarHeight} + ${mobileGlobals.safeAreaBottom})`,
      md: desktopGlobals.footerHeight,
    },
    left: {
      xs: '0px',
      md: desktopGlobals.sectionNavigationWidth,
    },
    top: {
      xs: mobileGlobals.safeAreaTop,
      md: desktopGlobals.headerHeight,
    },
  },
  paperStyles: {
    height: '100%',
    background: abiomedColors.mmDarkNavy,
    overflowY: 'hidden',
    position: 'relative',
  },
};

export const contentDrawerStyles = {
  modalStyles: {
    ...drawerStyles.modalStyles,
    zIndex: contentDrawerZIndex,
    height: '100vh',
    top: '0px',
    bottom: '0px',
  },
};

// used by settings and search drawers
export const popoverDrawerStyles = {
  ...drawerStyles,
  modalStyles: {
    ...drawerStyles.modalStyles,
    bottom: {
      xs: '0px',
    },
    zIndex: contentDrawerZIndex,
  },
};

export const sectionNavigationDrawerStyles = {
  modalStyles: {
    ...drawerStyles.modalStyles,
    left: 0,
    right: `calc(100vw - ${desktopGlobals.sectionNavigationWidth})`,
  },
  paperStyles: {
    ...drawerStyles.paperStyles,
  },
};

export const acePodGlobals = {
  bufferHeight: '70px',
  headerHomeHeight: '100px',
  headerNavHeight: '130px',
  miniPlayerHeight: '60px',
  tabBarHeight: '94px',
  tabBarWidthLandscape: '300px',
  bottomBufferLandscape: '12px',
  filterHeight: '36px',
};

export const acePodDrawerStyles = {
  paperStyles: {
    height: `calc(100vh - ${mobileGlobals.safeAreaTop})`,
    background: abiomedColors.podcastDark,
    top: mobileGlobals.safeAreaTop,
  },
  modalStyles: {
    height: '100%',
    bottom: {
      xs: acePodGlobals.tabBarHeight,
      md: '0px',
    },
    left: {
      xs: '0px',
      md: acePodGlobals.tabBarWidthLandscape,
    },
  },
};


export const buttonReset = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  outline: 'none',
  padding: '0',
};

export const center = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const checkbox = {
  '&.MuiCheckbox-root': {
    color: 'transparent',
  },
};

export const contentSection = {
  padding: '16px',
  '& h6': {
    fontWeight: 600,
    fontSize: '18px',
    margin: '16px 0',
    color: 'white',
  },
};

export const offline = {
  filter: 'grayscale(100%) opacity(0.35)',
};

export const playerIconButton = {
  outline: 'none',
  color: 'rgb(117, 117, 117)',
  cursor: 'pointer',
  width: '40px',
  height: '40px',

  '& i': {
    fontSize: '32px',
    lineHeight: '32px',
    width: '100%',
    transform: 'translate(-20px, -16px)',
  },
};

export const searchField = {
  background: 'white',
  borderRadius: '4px',
  width: '100%',
  '& .MuiInputBase-root': {
    fontSize: '18px',
    height: '40px',
  },
  '& .MuiInputBase-readOnly': {
    color: abiomedColors.darkGray,
  },
};

export const slidesAffectedMarker = {
  width: '16px;',
  height: '16px',
  borderRadius: '50%',

  '&.slides-removed': {
    background: 'red',
    boxShadow: '0 0 2px 2px pink',
  },

  '&.slides-updated': {
    background: 'orange',
    boxShadow: '0 0 2px 2px #ffe833',
  },
};


export const transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

export const shadow = '0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2)';

export const hover = 'rgb(238,238,238)';


