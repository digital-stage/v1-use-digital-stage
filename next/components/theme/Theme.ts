import {Property} from "csstype";
import {StyleObject} from "styletron-react";

export interface ButtonColors {
    color?: Property.Color;
    borderColor?: Property.BorderColor;
    borderRadius?: Property.BorderRadius;
    backgroundColor?: Property.BackgroundColor;
}

/**
 * Unordered digital stage colors
 */
const colorScheme = {
    background: {
        level5: '#f4f4f4',
        level4: '#393939',
        level3: '#282828',
        level2: '#1f1f1f',
        level1: '#121212',
    },
    status: {
        error: '#fa406b',
        success: '#41bd64',
        warning: '#f0c11b',
        info: '#5779d9'
    },
    text: {
        regular: {
            default: '#f4f4f4',
            inverted: '#121212',
        },
        muted: {
            default: '#9a9a9a',
            inverted: '#808080',
        },
        tertiaryHover: 'ä676767'
    },
    stageBlue: '#012340',
    stageRed: '#f20544',
    dangerButton: {
        default: '#f20544',
        active: '#fa406b',
        hover: '#b50030'
    },
    primary: {
        default: '#5779D9',
        outline: '#253ceb',
        button: {
            default: '#5779d9',
            active: '#6f92f8',
            hover: '#415ca7'
        },
        link: '#5779d9',
        hover: '#4571b1'
    },
    input: {
        label: {
            default: '#9a9a9a',
            hover: '#f4f4f4'
        },
        borderBottom: {
            default: '#f4f4f4',
            hover: '#415ca7',
            focus: '#3737f7',
            active: '#80cbc4',
            filled: '#f4f4f4',
            error: '#a41318',
        }
    },
    tertiary: {
        outline: '#808080',
        hover: '#676767'
    }
}


interface ColorTheme {
    typography: {
        regular: Property.Color;
        micro: Property.Color;
    },
    background: {
        lighter: Property.BackgroundColor,
        light: Property.BackgroundColor,
        default: Property.BackgroundColor,
        dark: Property.BackgroundColor,
        darker: Property.BackgroundColor,
    },
    button: {
        primary: StyleObject;
        secondary: StyleObject;
        tertiary: StyleObject;
        danger: StyleObject;
    },
    toggle: {
        primary: {
            active: StyleObject;
            inactive: StyleObject;
        };
        tertiary: {
            active: StyleObject;
            inactive: StyleObject;
        };
    },
}

const colors: ColorTheme = {
    typography: {
        regular: colorScheme.text.regular.default,
        micro: colorScheme.text.muted.default,
    },
    background: {
        lighter: colorScheme.background.level5,
        light: colorScheme.background.level4,
        default: colorScheme.background.level3,
        dark: colorScheme.background.level2,
        darker: colorScheme.background.level1,
    },
    button: {
        primary: {
            color: colorScheme.text.regular.default,
            borderColor: colorScheme.primary.button.default,
            backgroundColor: colorScheme.primary.button.default,
            ":hover": {
                borderColor: colorScheme.primary.button.hover,
                backgroundColor: colorScheme.primary.button.hover,
            },
            ":focus": {
                borderColor: colorScheme.primary.outline,
                backgroundColor: colorScheme.primary.button.active,
            },
            ":active": {
                borderColor: colorScheme.primary.button.active,
                backgroundColor: colorScheme.primary.button.default,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        },
        secondary: {
            color: colorScheme.text.regular.default,
            borderColor: colorScheme.primary.button.default,
            backgroundColor: 'transparent',
            ":hover": {
                opacity: 0.3,
                borderColor: colorScheme.primary.button.hover,
                backgroundColor: colorScheme.text.regular.inverted,
            },
            ":focus": {
                opacity: 1,
                borderColor: colorScheme.primary.outline,
            },
            ":active": {
                opacity: 0.3,
                borderColor: colorScheme.primary.button.active,
                backgroundColor: colorScheme.primary.button.active,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        },
        tertiary: {
            color: colorScheme.text.regular.default,
            borderColor: colorScheme.tertiary.outline,
            ":hover": {
                opacity: 0.3,
                borderColor: colorScheme.tertiary.hover
            },
            ":focus": {
                opacity: 1,
                borderColor: colorScheme.primary.outline,
            },
            ":active": {
                opacity: 0.3,
                borderColor: colorScheme.primary.button.active,
                backgroundColor: colorScheme.primary.button.active,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        },
        danger: {
            color: colorScheme.text.regular.default,
            borderColor: colorScheme.dangerButton.default,
            backgroundColor: colorScheme.dangerButton.default,
            ":hover": {
                borderColor: colorScheme.dangerButton.hover,
                backgroundColor: colorScheme.dangerButton.hover,
            },
            ":focus": {
                borderColor: colorScheme.primary.outline,
            },
            ":active": {
                borderColor: colorScheme.dangerButton.active,
                backgroundColor: colorScheme.dangerButton.active,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        },
    },
    toggle: {
        primary: {
            active: {
                color: colorScheme.text.regular.default,
                borderColor: colorScheme.primary.button.default,
                backgroundColor: colorScheme.primary.button.default,
                ":hover": {
                    borderColor: colorScheme.primary.button.hover,
                    backgroundColor: colorScheme.primary.button.hover,
                },
                ":focus": {
                    borderColor: colorScheme.primary.outline,
                    backgroundColor: colorScheme.primary.button.active,
                },
                ":active": {
                    borderColor: colorScheme.primary.button.active,
                    backgroundColor: colorScheme.primary.button.default,
                },
                ":disabled": {
                    boxShadow: 'none',
                    opacity: 0.5,
                    cursor: 'default'
                },
            },
            inactive: {
                color: colorScheme.text.regular.default,
                borderColor: colorScheme.tertiary.outline,
                ":hover": {
                    opacity: 0.3,
                    borderColor: colorScheme.tertiary.hover
                },
                ":focus": {
                    opacity: 1,
                    borderColor: colorScheme.primary.outline,
                },
                ":active": {
                    opacity: 0.3,
                    borderColor: colorScheme.primary.button.active,
                    backgroundColor: colorScheme.primary.button.active,
                },
                ":disabled": {
                    boxShadow: 'none',
                    opacity: 0.5,
                    cursor: 'default'
                },
            }
        },
        tertiary: {
            active: {
                color: colorScheme.text.regular.inverted,
                borderColor: colorScheme.text.regular.default,
                backgroundColor: colorScheme.text.regular.default,
                ":hover": {
                    opacity: 0.3,
                },
                ":focus": {
                    opacity: 1,
                    borderColor: colorScheme.primary.outline,
                },
                ":active": {
                    opacity: 0.3,
                    borderColor: colorScheme.primary.button.active,
                    backgroundColor: colorScheme.primary.button.active,
                },
                ":disabled": {
                    boxShadow: 'none',
                    opacity: 0.5,
                    cursor: 'default'
                },
            },
            inactive: {
                color: colorScheme.text.regular.default,
                borderColor: colorScheme.tertiary.outline,
                ":hover": {
                    opacity: 0.3,
                    borderColor: colorScheme.tertiary.hover
                },
                ":focus": {
                    opacity: 1,
                    borderColor: colorScheme.primary.outline,
                },
                ":active": {
                    opacity: 0.3,
                    borderColor: colorScheme.primary.button.active,
                    backgroundColor: colorScheme.primary.button.active,
                },
                ":disabled": {
                    boxShadow: 'none',
                    opacity: 0.5,
                    cursor: 'default'
                },
            }
        }
    }
}

const breakpoints = {
    TABLET: "@media screen and (min-width: 881px)",
    DESKTOP: "@media screen and (min-width: 1200px)",
}

const fonts = {
    label: {
        color: colors.typography.micro,
        fontFamily: '\'Open Sans\', serif',
        fontWeight: 600,
        fontSize: '0.875rem',
        [breakpoints.TABLET]: {
            fontSize: '0.875rem',
        }
    },
    input: {
        color: colors.typography.regular,
        fontFamily: '\'Open Sans\', serif',
        fontSize: '0.875rem',
        [breakpoints.TABLET]: {
            fontSize: '0.875rem',
        }
    },
    button: {
        color: colors.typography.regular,
        fontFamily: '\'Poppins\', serif',
        fontWeight: 600,
        fontStyle: 'normal',
    },
    toggle: {
        color: colors.typography.regular,
        fontFamily: '\'Poppins\', serif',
        fontWeight: 600,
        fontStyle: 'normal',
    },
    body: {
        regular: {
            color: colors.typography.regular,
            fontFamily: '\'Open Sans\', serif',
            fontWeight: 'normal',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        micro: {
            color: colors.typography.micro,
            fontFamily: '\'Open Sans\', serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            [breakpoints.TABLET]: {
                fontSize: '0.75rem',
            }
        }
    },
    headline: {
        h1: {
            color: colors.typography.regular,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '2.5rem',
            [breakpoints.TABLET]: {
                fontSize: '2.5rem',
            }
        },
        h2: {
            color: colors.typography.regular,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '2rem',
            [breakpoints.TABLET]: {
                fontSize: '2rem',
            }
        },
        h3: {
            color: colors.typography.regular,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '1.5rem',
            [breakpoints.TABLET]: {
                fontSize: '1.5rem',
            }

        },
        h4: {
            color: colors.typography.regular,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '1.125rem',
            [breakpoints.TABLET]: {
                fontSize: '1.125rem',
            }

        },
        h5: {
            color: colors.typography.regular,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        h6: {
            color: colors.typography.regular,
            fontFamily: '\'Open Sans\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        }
    }
}
export {
    fonts,
    colorScheme,
    colors,
    breakpoints
}
