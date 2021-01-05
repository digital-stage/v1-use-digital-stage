import breakpoints from "./breakpoints";
import colors from "./colors";

const fonts = {
    input: {
        label: {
            color: colors.text.regular.default,
            fontFamily: '\'Open Sans\', serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        field: {
            color: colors.text.regular.default,
            fontFamily: '\'Open Sans\', serif',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        notification: {
            color: colors.text.muted.default,
            fontFamily: '\'Open Sans\', serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        }
    },
    button: {
        color: colors.text.regular.default,
        fontFamily: '\'Poppins\', serif',
        fontWeight: 600,
        fontStyle: 'normal',
    },
    toggle: {
        color: colors.text.regular.default,
        fontFamily: '\'Poppins\', serif',
        fontWeight: 600,
        fontStyle: 'normal',
    },
    body: {
        regular: {
            color: colors.text.regular.default,
            fontFamily: '\'Open Sans\', serif',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        micro: {
            color: colors.text.muted.default,
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
            color: colors.text.regular.default,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '2.5rem',
            [breakpoints.TABLET]: {
                fontSize: '2.5rem',
            }
        },
        h2: {
            color: colors.text.regular.default,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '2rem',
            [breakpoints.TABLET]: {
                fontSize: '2rem',
            }
        },
        h3: {
            color: colors.text.regular.default,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '1.5rem',
            [breakpoints.TABLET]: {
                fontSize: '1.5rem',
            }

        },
        h4: {
            color: colors.text.regular.default,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '1.125rem',
            [breakpoints.TABLET]: {
                fontSize: '1.125rem',
            }

        },
        h5: {
            color: colors.text.regular.default,
            fontFamily: '\'Poppins\', serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '0.875rem',
            [breakpoints.TABLET]: {
                fontSize: '0.875rem',
            }
        },
        h6: {
            color: colors.text.regular.default,
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
export default fonts;
