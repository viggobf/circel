import * as icons from '@fortawesome/free-solid-svg-icons'
import { colourPacks, getDocFromFirestore } from 'uniux'
import ReactDom from 'react-dom'
import * as React from 'react'

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
    },
    callbackFunction: function (app, auth) {
      try {
        const currentUser = auth.currentUser
        ReactDom.render(auth.currentUser.displayName, document.getElementById('settingsName'))
        document.getElementById('settingsPfp').src = auth.currentUser.photoURL
        getDocFromFirestore('userInfo', auth.currentUser.uid).then(function (result) {
          ReactDom.render(<span>{'@' + result['username']}</span>, document.getElementById('settingsAcntUsername'))
        })
      } catch (e){
        console.log(e)
      }
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
      pageOptionButtons: [['Save changes', icons.faSave, 'themeColour', function () { alert('hi') }, true]],
    },
    appearance: {
      name: 'Appearance',
      icon: icons.faPaintBrush,
      url: '/appearance',
    },
  },
  themeColour: colourPacks.purple,
}

export { appConfig }