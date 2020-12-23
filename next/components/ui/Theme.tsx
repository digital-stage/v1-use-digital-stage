

const colorList = {
    red: 'rgba(242, 5, 68, 1)',
    blue: 'rgba(1, 35, 64, 1)',
    lightBlue: ''


}

const colors = {
    global: {
        white: 'rgb(244, 244, 244)',
        black: 'rgb(18, 18, 18)',
        error: 'rgb(250, 64, 107)',
        warning: 'rgb(240, 193, 27)',
        success: 'rgba(65, 189, 100)',
        primary: 'rgb(87, 121, 217)',
        secondary: 'rgb(242, 5, 68)'
    },
    interaction: {
        default: 'rgb(87, 121, 217)',
        active: 'rgba(111, 146, 248)',
        hover: 'rgb(65, 92, 167)',
        focus: 'rgb(37, 60, 235)',
    },
    text: {
        default: 'rgb(18, 18, 18)',
        inverted: 'rgb(255,255,255)',
        muted: 'rgb(80,80,80)',
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
        text: 'rgb(0,0,0)',
        border: 'rgb(0,0,0)',
        background: 'rgb(195,195,195)',
        hover: {
            text: 'rgb(0,0,0)',
            border: 'rgb(0,0,0)',
            background: 'rgb(177,177,177)',
        },
        disabled: {
            text: 'rgb(80,80,80)',
            border: 'rgb(80,80,80)',
            background: 'rgb(177,177,177)',
        }
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
    family: {
        default: '\'Arial\', serif',
        headline: '\'Lato\', serif'
    },
}

export {
    fonts,
    colors,
    breakpoints
}
