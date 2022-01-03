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

var appConfig = {
    loginRequired: false,
    overrideCBPBarring: true,
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
}

export { appConfig }