import * as cUniUX from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'


const appConfig = {
    parentProject: {name: 'Circel'},

    name: 'Clock',
    appCode: 'CLK',
    icon: cUniUX.icons.faClock,
    rootURL: 'clock',
    initialAppData: {
        settings: {
            timerTone: 'default'
        }
    },
    design: {
        themeColour: cUniUX.colourPacks.black
    },
    
    pageConfigs: {
        indexPage: {
            name: 'World Clock',
            icon: cUniUX.icons.faGlobe,
            url: '',

            content: <span>
                <span className={cUniUX.styles.minorText}>
                    The Clock app is coming soon, likely in Alpha 3. However, here's a look at the configuration of the app for you. This app uses the new
                    App Data framework in order to store its data on the CDS.
                </span>
            </span>
        },

        timer: {
            name: 'Timer',
            icon: cUniUX.icons.faStopwatch20,
            url: '',

            content: <span>
                <span className={cUniUX.styles.minorText}>
                    Select a time zone to see the time of day in that location.
                </span>
            </span>
        },

        stopwatch: {
            name: 'Stopwatch',
            icon: cUniUX.icons.faStopwatch,
            url: '',

            content: <span>
                <span className={cUniUX.styles.minorText}>
                    Select a time zone to see the time of day in that location.
                </span>
            </span>
        }
    }
}


export {appConfig}