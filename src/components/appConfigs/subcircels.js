import * as icons from '@fortawesome/free-solid-svg-icons'
import { colourPacks, getCFile, contextMenu, dialog, updateUserProfilePicture } from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'
import LogoImage from '../../pages/icon.png'
import {projectConfig} from '../projectConfig.js'
import * as database from 'firebase/database'

const appConfig = {
  parentProject: projectConfig,

  name: 'Subcircels',
  rootURL: 'subcircels',
  loginRequired: true,
  design: {
    applyThemeColourToContentBackground: false,
    themeColour: colourPacks.black,
    enableDarkMode: 'system'
  },
  autoFirebase: {
    enable: false,
    config: {
      apiKey: "AIzaSyDGFdDCD1ZwvOzbvtWNxseRpSfOOz5dAro",
      authDomain: "circel-app.firebaseapp.com",
      projectId: "circel-app",
      storageBucket: "circel-app.appspot.com",
      messagingSenderId: "121186697586",
      appId: "1:121186697586:web:93874da3a21c182b219deb",
      measurementId: "G-72PCDLGBEL"
    },
    auth: {
      enableSocialLogin: {
        google: true,
        twitter: true
      }
    }
  },


  pageConfigs: {
    // new: {
    //   name: 'Create Subcircel',
    //   icon: icons.faPlus,
    //   url: '/new'
    // },
    home: {
      name: "My Subcircels",
      icon: icons.faThLarge,
      url: '/',
      pageOptionButtons: [['Create Subcircel', icons.faPlus, 'themeColour', function (ev) {
        dialog('Create Subcircel', <p></p>
          
          ,[['Like article', function(){alert('likeddd')}]], ev)
      }, false], ['Share', icons.faShare, '', function () { alert('hi') }, false]],
      autoFirebase: {
        callbackFunction: function (app, auth, currentUser, cdsDatabase) {
          // database.onValue(database.ref(cdsDatabase, `/content`), function (snapshot) {
          //   if (snapshot.exists()) {
          //     ReactDom.render('Data: ' + snapshot.val(), document.getElementById('header1'))
          //   } else {
          //     alert("No data available");
          //   }
          // })
        }
      }
    },
  },
}


export { appConfig }