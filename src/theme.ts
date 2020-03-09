const OPEN_SANS_REGULAR =  "'Open Sans', sans-serif";
const OPEN_SANS_CONDENCED = "'Open Sans Condensed', sans-serif";
const ROBOTO_MONO = "'Roboto Mono', monospace";

const EGGSHELL_WHITE = '#EAF0CE';
const REGISTRATION_BLACK = '#070600';
const PINK_RASPBERRY = '#9C0D38';
const VIDID_CERULEAN = '#009DDC';
const MALACHITE = '#0CCE6B';

export interface Theme {
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  },
  colors: {
    text: string;
    background: string;
    main: string;
    accentLight: string;
    accentDark: string;
    shadow: string;
  };
  fontFamilies: {
    heading: string;
    text: string;
    code: string;
  };
  maxWidth: string;
}

const theme: Theme = {
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  colors: {
    text: EGGSHELL_WHITE,
    background: REGISTRATION_BLACK,
    main: PINK_RASPBERRY,
    accentLight: VIDID_CERULEAN,
    accentDark: MALACHITE,
    shadow: 'rgba(0,0,0,0.75)'
  },
  fontFamilies: {
    heading: OPEN_SANS_CONDENCED,
    text: OPEN_SANS_REGULAR,
    code: ROBOTO_MONO
  },
  maxWidth: '1000px'
};

export default theme;
