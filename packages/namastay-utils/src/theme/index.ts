import { STYLE_CONFIGS } from '@namastay/constants';

// TODO: Change to global type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppTheme = any;

export const createTheme = (
  // TODO: Remove MUI
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMuiTheme: any,
  appTheme: AppTheme
): AppTheme => {
  const {
    fontFamily,
    backgroundColor,
    primaryColor,
    secondaryColor,
    errorColor,
    textColor,
    linkColor,
    sectionTitleColor,
    sectionSubtitleColor,
  } = appTheme;

  const palette = {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: errorColor,
    },
    link: {
      main: linkColor,
    },
  };

  const fontFamilies = [fontFamily, 'Helvetica'].join(',');
  // Create a theme instance.
  const defaultTheme = createMuiTheme({
    typography: {
      fontFamily: fontFamilies,
    },
    spacing: 4,
    /* Values added below are added because some MUI components use a specific shadow (Dialog used shadow 24), but
      at the time of this writing there isn't any other shadow except the default one. There are multiple ways to solve this,
      but an easy fix for now is setting the default shadow to all the shadow values. */
    shadows: {
      0: 'none',
      1: STYLE_CONFIGS.boxShadow,
      /* Values added below are added because some MUI components use a specific shadow (Dialog used shadow 24), but
      at the time of this writing there isn't any other shadow except the default one. There are multiple ways to solve this,
      but an easy fix for now is setting the default shadow to all the shadow values. */
      2: STYLE_CONFIGS.boxShadow,
      3: STYLE_CONFIGS.boxShadow,
      4: STYLE_CONFIGS.boxShadow,
      5: STYLE_CONFIGS.boxShadow,
      6: STYLE_CONFIGS.boxShadow,
      7: STYLE_CONFIGS.boxShadow,
      8: STYLE_CONFIGS.boxShadow,
      9: STYLE_CONFIGS.boxShadow,
      10: STYLE_CONFIGS.boxShadow,
      11: STYLE_CONFIGS.boxShadow,
      12: STYLE_CONFIGS.boxShadow,
      13: STYLE_CONFIGS.boxShadow,
      14: STYLE_CONFIGS.boxShadow,
      15: STYLE_CONFIGS.boxShadow,
      16: STYLE_CONFIGS.boxShadow,
      17: STYLE_CONFIGS.boxShadow,
      18: STYLE_CONFIGS.boxShadow,
      19: STYLE_CONFIGS.boxShadow,
      20: STYLE_CONFIGS.boxShadow,
      21: STYLE_CONFIGS.boxShadow,
      22: STYLE_CONFIGS.boxShadow,
      23: STYLE_CONFIGS.boxShadow,
      24: STYLE_CONFIGS.boxShadow,
    },
    palette,
  });

  const theme = createMuiTheme(defaultTheme, {
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'none',
          },
        },
      },
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          input: {
            backgroundColor,
            border: `1px solid #B7C2D0`,
            borderRadius: STYLE_CONFIGS.borderRadius,
            paddingLeft: '20px',
            paddingTop: '16px',
            paddingBottom: '16px',
            color: '#6A7D93',
            '&:focus': {
              border: `1.5px solid #B7C2D0`,
              outline: 0,
              '--tw-ring-color': 'unset',
              '--tw-ring-shadow': 'unset',
              '&.MuiInputLabel': {
                top: '0px',
                fontSize: '10px',
              },
            },
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            position: 'absolute',
            left: '0px',
            top: '21%',
            transformOrigin: 'left top',
            letterSpacing: '1px',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '23px',
            color: `#6A7D93 !important`,
            pointerEvents: 'none',
            maxWidth: 'calc(100% - 24px)',
            width: '100%',
            transform: 'translate(14px, 16px) scale(1)',
            transition: 'all 0.2s ease',
            zIndex: 1,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // The props to apply
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: STYLE_CONFIGS.borderRadius,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          containedPrimary: {
            color: 'white',
            '&:disabled': {
              color: 'white',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingRight: '16px',
            paddingLeft: '16px',
            [defaultTheme.breakpoints.up('sm')]: {
              // See here https://mui.com/customization/theming/#createtheme-options-args-theme
              paddingRight: STYLE_CONFIGS.containerPadding,
              paddingLeft: STYLE_CONFIGS.containerPadding,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: fontFamilies,
          },
          h1: {
            color: sectionTitleColor,
            fontSize: '1.5rem',
            fontWeight: '500',
          },
          h2: {
            color: sectionTitleColor,
            fontSize: '1.25rem',
            fontWeight: '500',
          },
          h3: {
            color: sectionTitleColor,
            fontSize: '18px',
            lineHeight: '26px',
            fontWeight: '500',
          },
          body2: {
            color: textColor,
            fontWeight: '400',
          },
          subtitle1: {
            color: sectionSubtitleColor,
            fontWeight: '400',
            fontSize: '0.75rem',
            lineHeight: '16px',
          },
          subtitle2: {
            color: sectionSubtitleColor,
            fontSize: '18px',
            lineHeight: '25px',
          },
          calendarDayPrice: {
            fontSize: '.75rem',
          },
          calendarDay: {
            fontSize: '18px',
            fontWeight: '450',
            letterSpacing: '-0.2px',
            '&:hover': {
              color: 'white',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: 'pointer',
          },
        },
      },
    },
  });

  return theme;
};

export const shouldForwardProp = (propName: string): boolean =>
  propName !== 'namastayTheme' &&
  propName !== 'appTheme' &&
  propName !== 'hasBorderRadius';

export const hexToRgbCssVariable = (hex: string, type: string): string => {
  const color = hex.replace(/#/g, '');
  // rgb values
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  return `--color-${type}: ${r}, ${g}, ${b};`;
};
