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
  name: 'Settings',
  shortenedName: 'Settings',
  rootURL: 'settings',
  loginRequired: true,
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
      name: 'Home',
      icon: icons.faHome,
      url: '/',
    },
    account: {
      name: 'Account',
      icon: icons.faUser,
      url: '/account',
      pageOptionButtons: [['Save changes', icons.faSave, function () { alert('hi') }, true]]
    },
    appearance: {
      name: 'Appearance',
      icon: icons.faPaintBrush,
      url: '/appearance'
    },
  },
  themeColour: colourPacks.grey,
}

export { appConfig }