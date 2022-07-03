import { colourPacks, icons, FullWidthNavCard, getCFile, alertDialog } from 'cuniux'
import { initializeApp } from '@firebase/app'
import { projectConfig } from '../projectConfig.js'
import React from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDGFdDCD1ZwvOzbvtWNxseRpSfOOz5dAro",
    authDomain: "circel-app.firebaseapp.com",
    projectId: "circel-app",
    storageBucket: "circel-app.appspot.com",
    messagingSenderId: "121186697586",
    appId: "1:121186697586:web:93874da3a21c182b219deb",
    measurementId: "G-72PCDLGBEL"
};

const app = initializeApp(firebaseConfig);

const appConfig = {
    parentProject: projectConfig,

    name: 'Home',
    appCode: 'HOM',
    initialAppData: {

    },
    loginRequired: true,
    icon: icons.faHome,
    rootURL: '',
    sections: [],
    design: {
        // themeColour:{
        //     normal: 'rgb(13, 69, 100)',
        //     light: 'rgb(13, 69, 100)',
        //     mostLight: 'rgb(13, 69, 100)',
        // },
        themeColour: colourPacks.black,
        enableDarkMode: 'system'
    },
    keyBinds: [
        {
            key: 'F',
            cmdOrCtrlKey: true,
            altKey: true,
            // shiftKey: false,
            callbackFunction: function () {
                alertDialog('Keyboard Shortcut bound', "Your keyboard shortcut has been successfully bound. Yey!")
            }
        }
    ],
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
            name: 'Home',
            icon: icons.faHome,
            url: '/',
            autoFirebase: {
                callbackFunction: function (fbObj) {
                }
            },

            content: <span>
                <h4>
                    More coming soon
                </h4>
                <p>
                    This page is yet to be worked on, but in the meantime here's some pages that have more to them that you might want to visit (gonna fix this massive text).
                </p>
                <FullWidthNavCard name='Visit your Settings' takeTo='/settings/' children={<span>
                    Edit Account info, change Appearance (coming soon), plus more to come.
                </span>} />
            </span>
        },
    },
}

export { appConfig }