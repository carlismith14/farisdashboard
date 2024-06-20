import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

// Desktop
export const Desktop = React.forwardRef(({ children, includeTablet, customBreak, alwaysUse, neverUse }, ref) => {
  const minWidth = customBreak || (includeTablet ? 951 : 1280); 
  const isNonMobile = useMediaQuery({ minWidth });

  if (alwaysUse) {
    return children;
  }
  if (neverUse || !isNonMobile) {
    return null;
  }
  
  return isNonMobile ? children : null;
});

Desktop.defaultProps = {
  alwaysUse: false,
  customBreak: 0,
  includeTablet: true,
  neverUse: false,
};

Desktop.propTypes = {
  alwaysUse: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customBreak: PropTypes.number,
  includeTablet: PropTypes.bool,
  neverUse: PropTypes.bool,
};

// Mobile is for iPhone
export const Mobile = React.forwardRef(({ children, includeTablet, alwaysUse, neverUse }, ref) => {
  const maxWidth = includeTablet ? 1279 : 950;
  const isMobile = useMediaQuery({ maxWidth });

  if (alwaysUse) {
    return children;
  }
  if (neverUse || !isMobile) {
    return null;
  }

  return isMobile ? children : null;
});

Mobile.defaultProps = {
  alwaysUse: false,
  includeTablet: false,
  neverUse: false,
};

Mobile.propTypes = {
  alwaysUse: PropTypes.bool,
  children: PropTypes.node.isRequired,
  includeTablet: PropTypes.bool,
  neverUse: PropTypes.bool,
};
