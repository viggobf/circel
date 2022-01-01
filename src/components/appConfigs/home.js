import * as icons from '@fortawesome/free-solid-svg-icons'
import { colourPacks } from 'uniux'
import { initializeApp } from '@firebase/app'

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
    name: 'Home',
    shortenedName: 'Home',
    rootURL: '',
    sections: [],
    firebase: {
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
            name: 'Home',
            icon: icons.faHome,
            url: '/'
        },
        go: {
            name: 'Go',
            icon: icons.faRocket,
            url: '/go'
        }
    },
    themeColour: colourPacks.blue,
}

export { appConfig }