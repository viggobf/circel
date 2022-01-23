import * as icons from '@fortawesome/free-solid-svg-icons'
import { colourPacks, getDocFromFirestore, contextMenu, dialog, updateUserProfilePicture } from 'uniux'
import ReactDom from 'react-dom'
import * as React from 'react'

const appConfig = {
  name: 'Settings',
  shortenedName: 'Settings',
  rootURL: 'settings',
  loginRequired: true,
  sections: [],
  circel: {
    circelApp: true,
  },
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
      autoFirebase: {
        callbackFunction: function (app, auth) {
          try {
            const currentUser = auth.currentUser
            ReactDom.render(auth.currentUser.displayName, document.getElementById('settingsName'))
            document.getElementById('settingsPfp').src = auth.currentUser.photoURL
            if (auth.currentUser.photoURL === 'https://www.inspirations.boutique/wp-content/uploads/2019/10/blank-person-profile.png'){
              document.getElementById('settingsPfp').addEventListener('contextmenu', function (e) {
                contextMenu(e, [['Change Profile Picture...', function () {
                  dialog('Change Profile Picture', <div>
                    <label for='pfpUrlInput'>Paste your new profile picture's URL</label><br />
                    <input placeholder='Image URL' id='pfpUrlInput' />
                  </div>, ['Save Profile Picture', function () { updateUserProfilePicture(document.getElementById('pfpUrlInput').value) }])
                }], ['Remove Profile Picture', function () { updateUserProfilePicture('https://www.inspirations.boutique/wp-content/uploads/2019/10/blank-person-profile.png') }]])
              })
            } else {
              document.getElementById('settingsPfp').addEventListener('contextmenu', function (e) {
                contextMenu(e, [['Change Profile Picture...', function () {
                  dialog('Add Profile Picture', <div>
                    <label for='pfpUrlInput'>Paste your profile picture's URL</label><br />
                    <input placeholder='Image URL' id='pfpUrlInput' />
                  </div>, ['Save Profile Picture', function () { updateUserProfilePicture(document.getElementById('pfpUrlInput').value) }])
                }], ['Remove Profile Picture', function () { updateUserProfilePicture('https://www.inspirations.boutique/wp-content/uploads/2019/10/blank-person-profile.png') }]])
              })
            }
            getDocFromFirestore('userInfo', auth.currentUser.uid).then(function (result) {
              ReactDom.render(<span>{'@' + result['username']}</span>, document.getElementById('settingsAcntUsername'))
            })
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
    appearance: {
      name: 'Appearance',
      icon: icons.faPaintBrush,
      url: '/appearance',
    },
  },
  themeColour: colourPacks.grey,
}

export { appConfig }