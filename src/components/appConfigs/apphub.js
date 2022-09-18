import * as cUniUX from 'cuniux'; 
import { projectConfig } from '../projectConfig';
import ReactDom from 'react-dom'
import * as React from 'react'

const appConfig = {
    parentProject: projectConfig,

    name: 'AppHub',
    appCode: 'APH',
    loginRequired: true,
    rootURL: 'apphub',
    initialAppData: {},
    sections: [],
    autoFirebase: {
        enable: true,
        config: {
            apiKey: "AIzaSyDGFdDCD1ZwvOzbvtWNxseRpSfOOz5dAro",
            authDomain: "circel-app.firebaseapp.com",
            projectId: "circel-app",
            storageBucket: "circel-app.appspot.com",
            messagingSenderId: "121186697586",
            appId: "1:121186697586:web:93874da3a21c182b219deb",
            measurementId: "G-72PCDLGBEL"
        }
    },
    pageConfigs: {
        indexPage: {
            name: 'Today',
            icon: cUniUX.icons.faHome,
            url: '/',

            content: <span>
                <cUniUX.PrimaryActionCard name='Best of 2021'/>
            </span>
        },
        anotherTest: {
            name: 'All Apps',
            icon: cUniUX.icons.faRocket,
            url: '/anothertest'
        }
    },

    design: {
        accentColour: cUniUX.colourPacks.blue
    }
}

export {appConfig}