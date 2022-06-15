import * as cUniUX from 'cuniux'; 
import { projectConfig } from '../projectConfig';

const appConfig = {
    parentProject: projectConfig,

    name: 'AppHub',
    shortenedName: 'Home',
    loginRequired: true,
    rootURL: '',
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
        home: {
            name: 'Today',
            icon: cUniUX.icons.faHome,
            url: '/'
        },
        anotherTest: {
            name: 'All Apps',
            icon: cUniUX.icons.faRocket,
            url: '/anothertest'
        }
    },

    design: {
        themeColour: cUniUX.colourPacks.blue
    }
}

export {appConfig}