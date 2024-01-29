import { CSSProperties } from 'react';
import { PaletteColor, SxProps, Theme, alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

interface ThemeOverrides {
  MuiCssBaseline?: {
    styleOverrides?: {
      [key: string]: CSSProperties;
    };
  };
  MuiBackdrop?: {
    styleOverrides?: {
      root?: CSSProperties;
      invisible?: CSSProperties;
    };
  };
  MuiButton?: {
    styleOverrides?: {
      containedInherit?: SxProps<Theme>;
      sizeLarge?: SxProps<Theme>;
    };
  };
  MuiCard?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
  MuiCardHeader?: {
    defaultProps?: {
      titleTypographyProps?: {
        variant?: string;
      };
      subheaderTypographyProps?: {
        variant?: string;
      };
    };
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
  MuiOutlinedInput?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
  MuiPaper?: {
    defaultProps?: {
      elevation?: number;
    };
  };
  MuiTableCell?: {
    styleOverrides?: {
      head?: {
        color?: string;
        backgroundColor?: string;
      };
    };
  };
  MuiTooltip?: {
    styleOverrides?: {
      tooltip?: SxProps<Theme>;
      arrow?: SxProps<Theme>;
    };
  };
  MuiTypography?: {
    styleOverrides?: {
      paragraph?: SxProps<Theme>;
      gutterBottom?: {
        marginBottom?: string;
      };
    };
  };
  MuiMenuItem?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
}

export function overrides(theme: Theme): ThemeOverrides {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8),
        },
        invisible: {
          background: 'transparent',
          // Other CSS properties as needed
        },
      },
    },
    // ... Other component overrides
  };
}

/*
interface ThemeOverrides {
  MuiCssBaseline?: {
    styleOverrides?: {
      [key: string]: SxProps<Theme>;
    };
  };
  MuiBackdrop?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
      invisible?: SxProps<Theme>;
    };
  };
  MuiButton?: {
    styleOverrides?: {
      containedInherit?: SxProps<Theme>;
      sizeLarge?: SxProps<Theme>;
    };
  };
  MuiCard?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
  MuiCardHeader?: {
    defaultProps?: {
      titleTypographyProps?: {
        variant?: string;
      };
      subheaderTypographyProps?: {
        variant?: string;
      };
    };
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
  MuiOutlinedInput?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
  MuiPaper?: {
    defaultProps?: {
      elevation?: number;
    };
  };
  MuiTableCell?: {
    styleOverrides?: {
      head?: {
        color?: string;
        backgroundColor?: string;
      };
    };
  };
  MuiTooltip?: {
    styleOverrides?: {
      tooltip?: SxProps<Theme>;
      arrow?: SxProps<Theme>;
    };
  };
  MuiTypography?: {
    styleOverrides?: {
      paragraph?: SxProps<Theme>;
      gutterBottom?: {
        marginBottom?: string;
      };
    };
  };
  MuiMenuItem?: {
    styleOverrides?: {
      root?: SxProps<Theme>;
    };
  };
}

interface ThemeProps {
  typography: any;
  palette: {
    grey: {
      [key: number]: string;
    };
    common: {
      white: string;
    };
    text: {
      secondary: string;
    };
    background: {
      neutral: string;
    };
  } & PaletteColor;
  customShadows: {
    card: string;
  };
  shape: {
    borderRadius: number;
  };
  spacing: (...args: number[]) => string;
}

export function overrides(theme: Theme): ThemeOverrides {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey[800],
          '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[800],
          },
        },
        sizeLarge: {
          minHeight: 48,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
  };
}
*/
