import {Property} from "csstype";
import {CSSProperties} from "react";

export interface ButtonColors {
    color?: Property.Color;
    borderColor?: Property.BorderColor;
    borderRadius?: Property.BorderRadius;
    backgroundColor?: Property.BackgroundColor;
}

export interface ColorPalette {
    primary: {
        default: Property.Color;
        link: Property.Color;
        active: Property.Color;
        hover: Property.Color;
        focus: Property.Color;
        outline: Property.Color;
    };
    secondary: {
        default: Property.Color;
        link: Property.Color;
        active: Property.Color;
        hover: Property.Color;
        focus: Property.Color;
        outline: Property.Color;
    };
    tertiary: {
        default: Property.Color;
        link: Property.Color;
        active: Property.Color;
        hover: Property.Color;
        focus: Property.Color;
        outline: Property.Color;
    };
    danger: {
        default: Property.Color;
        link: Property.Color;
        active: Property.Color;
        hover: Property.Color;
        focus: Property.Color;
        outline: Property.Color;
    };
    status: {
        success: Property.Color;
        danger: Property.Color;
        warning: Property.Color;
        info: Property.Color;
    },
    text: {
        default: {
            default: Property.Color;
            inverted: Property.Color;
        }
        soft: {
            default: Property.Color;
            inverted: Property.Color;
        }
    },
    outline: Property.Color;
    background: {
        level1: Property.Color;
        level2: Property.Color;
        level3: Property.Color;
        level4: Property.Color;
        level5: Property.Color;
    },
    gradient: {
        300: Property.Color;
        400: Property.Color;
        500: Property.Color;
        600: Property.Color;
        700: Property.Color;
        800: Property.Color;
        900: Property.Color;
        1000: Property.Color;
        1100: Property.Color;
    },
};

export interface Theme {
    button: CSSProperties & {
        primary: ButtonColors & {
            hover: ButtonColors;
            active: ButtonColors;
            focus: ButtonColors;
            disabled: ButtonColors;
        };
        secondary: ButtonColors & {
            hover: ButtonColors;
            active: ButtonColors;
            focus: ButtonColors;
            disabled: ButtonColors;
        };
        tertiary: ButtonColors & {
            hover: ButtonColors;
            active: ButtonColors;
            focus: ButtonColors;
            disabled: ButtonColors;
        };
        danger: ButtonColors & {
            hover: ButtonColors;
            active: ButtonColors;
            focus: ButtonColors;
            disabled: ButtonColors;
        }
    }
}

const colors: Theme = {
    global: {
        white: 'rgb(244, 244, 244)',
        black: 'rgb(18, 18, 18)',
        error: 'rgb(250, 64, 107)',
        warning: 'rgb(240, 193, 27)',
        success: 'rgba(65, 189, 100)',
        primary: 'rgb(87, 121, 217)',
        secondary: 'rgb(242, 5, 68)',
    },
    interaction: {
        default: 'rgb(87, 121, 217)',
        active: 'rgba(111, 146, 248)',
        hover: 'rgb(65, 92, 167)',
        focus: 'rgb(37, 60, 235)',
    },
    text: {
        default: 'rgb(244, 244, 244)',
        inverted: 'rgb(18, 18, 18)',
        muted: 'rgb(128, 128, 128)',
    },
    background: {
        black: 'rgb(18,18,18)',
        darker: 'rgb(18,18,18)',
        dark: 'rgb(28,28,28)',
        default: 'rgb(39,39,39)',
        light: 'rgb(103,103,103)',
        lighter: 'rgb(195,195,195)',
        active: 'rgb(2,255,128)',
        selected: 'rgb(255,181,51)',
        record: 'rgb(242, 5, 68)'
    },
    mixer: {
        group: 'rgba(80,80,80,1)',
        stageMember: 'rgba(130,100,130,1)',
        track: 'rgba(100,100,130,1)'
    },
    button: {
        primary: {
            color: '#',
            borderColor: 'rgb(0,0,0)',
            backgroundColor: 'rgb(177,177,177)',
            hover: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            focus: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            active: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            disabled: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
        },
        secondary: {
            color: 'rgb(244, 244, 244)',
            borderColor: '#5779D9',
            backgroundColor: 'transparent',
            hover: {
                borderColor: '#415ca7',
                backgroundColor: 'rgb(177,177,177)',
            },
            focus: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            active: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            disabled: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
        },
        tertiary: {
            color: '#',
            borderColor: 'rgb(0,0,0)',
            backgroundColor: 'rgb(177,177,177)',
            hover: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            focus: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            active: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            disabled: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
        },
        danger: {
            color: '#',
            borderColor: 'rgb(0,0,0)',
            backgroundColor: 'rgb(177,177,177)',
            hover: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            focus: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            active: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
            disabled: {
                color: 'rgb(0,0,0)',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgb(177,177,177)',
            },
        },
    },
    toggle: {
        on: {
            enabled: {
                text: 'rgb(0,0,0)',
                border: 'rgb(80,80,80)',
                background: 'rgb(255,181,51)'
            },
            disabled: {
                text: 'rgb(80,80,80)',
                border: 'rgb(80,80,80)',
                background: 'rgb(195,195,195)'
            }
        },
        off: {
            enabled: {
                text: 'rgb(80,80,80)',
                border: 'rgb(80,80,80)',
                background: 'rgb(195,195,195)',
            },
            disabled: {
                text: 'rgb(80,80,80)',
                border: 'rgb(80,80,80)',
                background: 'rgb(165,165,165)',
            }
        }
    },
    input: {
        text: 'rgb(0,0,0)',
        border: 'rgb(80,80,80)',
        background: 'rgb(195,195,195)',
        active: {
            text: 'rgb(0,0,0)',
            border: 'rgb(0,0,0)',
            background: 'rgb(195,195,195)',
        },
        hover: {
            text: 'rgb(0,0,0)',
            border: 'rgb(0,0,0)',
            background: 'rgb(195,195,195)',
        },
        disabled: {
            text: 'rgb(80,80,80)',
            border: 'rgb(80,80,80)',
            background: 'rgb(165,165,165)',
        }
    },
    modal: {
        background: 'rgb(135,135,135)',
        boxShadow: 'rgba(0, 0, 0, 0.737) 0px 3px 6px',
        header: {
            background: 'rgb(90,90,90)',
        },
        body: {
            background: 'rgb(135,135,135)',
        },
        footer: {
            background: 'rgb(135,135,135)',
        },
        backdrop: {
            background: "rgba(0,0,0,0.7)",
        }
    }
}

const breakpoints = {
    TABLET: "@media screen and (min-width: 881px)",
    DESKTOP: "@media screen and (min-width: 1200px)",
}

const fonts = {
    body: {
        regular: {
            color: colors.text.default,
            fontFamily: '\'Open Sans\', serif',
            fontWeight: 'normal',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        micro: {
            color: colors.text.muted,
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
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '2.5rem',
            [breakpoints.TABLET]: {
                fontSize: '2.5rem',
            }
        },
        h2: {
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '2rem',
            [breakpoints.TABLET]: {
                fontSize: '2rem',
            }
        },
        h3: {
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '1.5rem',
            [breakpoints.TABLET]: {
                fontSize: '1.5rem',
            }

        },
        h4: {
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '1.125rem',
            [breakpoints.TABLET]: {
                fontSize: '1.125rem',
            }

        },
        h5: {
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        h6: {
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
    colors,
    breakpoints
}
