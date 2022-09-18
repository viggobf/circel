import * as icons from '@fortawesome/free-solid-svg-icons'
import * as cUniUX from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'
import { ReturnUpBackOutline } from 'react-ionicons'

var userUID
var userSettingsObj
var email

class SettingExplanationCard extends React.Component {
  render() {
    return <div>
      <cUniUX.FontAwesomeIcon icon={this.props.icon} style={{ fontSize: 'x-large', float: 'left', marginTop: '-2px', marginRight: '8px' }} />
      <span style={{ fontSize: '13.5px', marginTop: '2.5px', float: 'left' }}>
        Adapt the Circel interface appearance for your individual needs and preferences.
      </span>
    </div>
  }
}

const appConfig = {
  parentProject: {
    name: 'Circel'
  },

  name: 'Settings',
  icon: icons.faCog,
  appCode: 'STG',
  rootURL: 'settings',
  appOptionButtons: [['Export Settings as cFile', cUniUX.icons.faFile, function () { cUniUX.alertDialog('Coming soon', 'Exporting settings is coming soon.') }]],
  loginRequired: true,
  initialAppData: {
    hi: 'hey'
  },
  sections: [],
  circel: {
    circelApp: true,
  },
  design: {
    accentColour: cUniUX.colourPacks.grey,
    enableDarkMode: 'system'
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
    callbackFunction: function (fbObj) {
      userUID = fbObj.currentUser.uid
    },
    auth: {
      enableSocialLogin: {
        google: true,
        twitter: true
      }
    }
  },




  pageConfigs: {
    indexPage: {
      name: 'Home',
      icon: icons.faHome,
      url: '/',
      autoFirebase: {
        callbackFunction: function(){

        }
      },
      content: <span>
        <h4>
          Account
        </h4>
        <cUniUX.FullWidthNavCard name='Account Settings' takeToPage='account' children={<span>
          View your user profile, edit your account settings and more.
        </span>} />

        <cUniUX.FloatBr />

        <h4>
          Appearance
        </h4>
        <cUniUX.FullWidthNavCard name='Appearance Settings' takeToPage='appearance' children={<span>
          Make Circel look your own.
        </span>} />

        <cUniUX.FloatBr />

        <h4>
          Accessibility
        </h4>
        <cUniUX.FullWidthNavCard name='Accessibility Settings' takeToPage='accessibility' children={<span>
          Suit Circel to your individual needs.
        </span>} />
      </span>
    },
    account: {
      name: 'Account',
      icon: icons.faUser,
      url: '/account',
      autoFirebase: {
        callbackFunction: function (fbObj) {
          if (fbObj.currentUser.displayName) {
            ReactDom.render(fbObj.currentUser.displayName, document.getElementById('settingsName'))
          } else {
            ReactDom.render('Circel Account', document.getElementById('settingsName'))
          }

          if (fbObj.currentUser.photoURL) {
            document.getElementById('settingsPfp').src = fbObj.currentUser.photoURL
          }

          email = fbObj.currentUser.email
          // hiding the middle 6 characters of the email and replacing them with bullets • for privacy reasons
          String.prototype.replaceAt = function (index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
          }

          function changeEmail() {
            var ref1 = React.createRef()
            var ref2 = React.createRef()
            cUniUX.dialog("Verify that it's you", <span>
              <span className={cUniUX.styles.minorText}>In order to change your account's email address, you need to re-enter your account's password to verify it's you.</span>
              <br /><br />
              <input type='password' ref={ref1} placeholder='Password' />
            </span>, [['Continue', function () {
              cUniUX.reauthenticate(ref1.current.value, function () {
                cUniUX.dialog('Change Email Address', <span>
                  <span className={cUniUX.styles.minorText}>Enter your new email address:</span><br /><br />
                  <span id='emailSpan'><input type='email' ref={ref2} placeholder='New email' value='' /></span>

                </span>, [['Change Email', function () {
                  email = ref2.current.value
                  var emailMiddleLength = Math.round((ref2.current.value.length / 3))
                  var emailUnhiddenTrailStart = (ref2.current.value.length / 6) * 2
                  var bulletStr = ""
                  var emailMiddleLengthForSubtracting = emailMiddleLength
                  function extendBulletStr() {
                    if (emailMiddleLengthForSubtracting > 0) {
                      emailMiddleLengthForSubtracting = emailMiddleLengthForSubtracting - 1
                      bulletStr = bulletStr + '•'
                      extendBulletStr()
                    }
                  }
                  extendBulletStr()
                  cUniUX.updateUserEmail(ref2.current.value, function () { ReactDom.render(null, document.getElementById('settingsEmail')); ReactDom.render(ref2.current.value.replace(ref2.current.value.substring(emailUnhiddenTrailStart, emailUnhiddenTrailStart + emailMiddleLength), bulletStr), document.getElementById('settingsEmail')); cUniUX.closeDialog() }, function (e) { alert(e) })
                }, true]])
                ReactDom.render(<input type='email' ref={ref2} placeholder='New email' />, document.getElementById('emailSpan'))
              }, function (e) {
                alert(e)
              })
            }, true]])
          }

          var emailMiddleLength = Math.round((email.length / 3))
          var emailUnhiddenTrailStart = (email.length / 6) * 2
          var bulletStr = ""
          var emailMiddleLengthForSubtracting = emailMiddleLength
          function extendBulletStr() {
            if (emailMiddleLengthForSubtracting > 0) {
              emailMiddleLengthForSubtracting = emailMiddleLengthForSubtracting - 1
              bulletStr = bulletStr + '•'
              extendBulletStr()
            }
          }
          extendBulletStr()



          setTimeout(function () { ReactDom.render(<cUniUX.EventWrapper contextMenu={[['Show Full Address', function () { cUniUX.alertDialog('Full Email Address', email) }], ['Change Email Address...', changeEmail]]}> <span id='settingsEmail'>{email.replace(email.substring(emailUnhiddenTrailStart, emailUnhiddenTrailStart + emailMiddleLength), bulletStr)}</span>&ensp;<cUniUX.EventWrapper tooltip='Show Full Address'><cUniUX.FontAwesomeIcon icon={cUniUX.icons.faEye} onClick={function () { cUniUX.alertDialog('Full Email Address', email) }} /></cUniUX.EventWrapper></cUniUX.EventWrapper>, document.getElementById('settingsAcntEmail')) }, 1)

          ReactDom.render(<cUniUX.SettingItem name='Email Address' onClick={function () { changeEmail() }} buttonText='Change Email Address' description="Change your account's email address. For security reasons, you'll need to re-enter your password to do this." action='button' />, document.getElementById('accountInfoSpan'))
        }
      },
      content: <span>
        <h4>
          Your Profile
        </h4>

        <cUniUX.EventWrapper contextMenuOnLongPress={true} contextMenu={[['Change Profile Picture...', function () {
          cUniUX.dialog('Change Profile Picture', <div>
            <input placeholder='Paste an image URL' id='pfpUrlInput' />
          </div>, [['Save Profile Picture', function () { cUniUX.updateUserProfilePicture(document.getElementById('pfpUrlInput').value); document.getElementById('settingsPfp').src = document.getElementById('pfpUrlInput').value }, true]])
        }], ['Remove Profile Picture', function () { cUniUX.updateUserProfilePicture('https://www.inspirations.boutique/wp-content/uploads/2019/10/blank-person-profile.png') }]]}>
          <img onClick={function () {
            cUniUX.dialog('Edit Profile Picture', <div>
              <input placeholder='Paste an image URL' id='pfpUrlInput' />
            </div>, [['Save Profile Picture', function () { cUniUX.updateUserProfilePicture(document.getElementById('pfpUrlInput').value); document.getElementById('settingsPfp').src = document.getElementById('pfpUrlInput').value }, true]])
          }} className={cUniUX.styles.pfp} id='settingsPfp' style={{ float: 'left', width: '70px', height: '70px', marginRight: '15px', cursor: 'pointer' }}
            title='Profile Picture - click to edit'
          />
        </cUniUX.EventWrapper>
        <span style={{ float: 'left' }}>
          <cUniUX.EventWrapper contextMenu={[['Change Account Name', function () {
            var ref4 = React.createRef(); cUniUX.dialog('Change Account Name', <span>
              <span className={cUniUX.styles.minorText}>
                Enter a new name for your Circel account.
              </span><br /><br />

              <input ref={ref4} placeholder='New name' />
            </span>, [['Change Name', function () { cUniUX.updateUserDisplayName(ref4.current.value); ReactDom.render(ref4.current.value, document.getElementById('settingsName')) }]])
          }]]}>
            <h3 id='settingsName' style={{ marginTop: '8px', marginBottom: '8px' }} />
          </cUniUX.EventWrapper>
          <span className={cUniUX.styles.minorText} id='settingsAcntEmail' />
        </span>

        <br /><cUniUX.FloatBr />

        <h4>
          Account Information
        </h4>

        <span id='accountInfoSpan' />
      </span>
    },


    appearance: {
      name: 'Appearance',
      icon: icons.faPaintBrush,
      url: '/interface',
      autoFirebase: {
        callbackFunction: function (fbObj) {
          userSettingsObj = fbObj.userSettings


          // ACCENT COLOUR SETTINGS

          if (typeof userSettingsObj.interface.accentColour === 'string') {
            var accentColourSetting = cUniUX.accentColoursArray.length - 1
          } else {
            var accentColourSetting = userSettingsObj.interface.accentColour
          }

          ReactDom.render(<span>
            <cUniUX.SettingItem action='dropdown' selectedItemIndex={accentColourSetting} dropdownItemsArray={cUniUX.accentColoursArray} description={"Choose an accent colour, that'll apply to many locations across Circel, and if you choose, also all apps."} name='Accent Colour' changeFunction={function (colourIndex) {
              if (colourIndex === cUniUX.accentColoursArray.length - 1) {
                var clrRef = React.createRef()
                // alert('hi')

                cUniUX.dialog('Custom Accent Colour', <span>
                  <input placeholder='Paste an RGB, HEX, etc value' ref={clrRef} />
                </span>, [['Change Accent Colour', () => {
                  userSettingsObj.interface.accentColour = clrRef.current.value

                  cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)

                  cUniUX.closeDialog()
                }, true], ['Surprise Me!', function () {
                  userSettingsObj.interface.accentColour = 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')'

                  cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
                }]])
              } else {
                userSettingsObj.interface.accentColour = colourIndex

                cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
              }




            }} />

            <cUniUX.SettingItem action='toggle' description={"If enabled, apps that specify an accent colour will have their accent colour overridden by the one set by you here. If disabled, only apps that don't specify an accent colour will use your selection."} style={{ marginBottom: 8 }} default={false} name='Override App-specified Accent Colours' toggleOnText='Yes' enabled={userSettingsObj.interface.overrideAppAccentColours} toggleOffText="No" toggleFunction={function (status) {
              userSettingsObj.interface.overrideAppAccentColours = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} />
          </span>, document.getElementById('accentColourSetting'))







          // DARK MODE SETTING

          ReactDom.render(<cUniUX.SettingItem action='dropdown' selectedItemIndex={userSettingsObj.interface.darkMode} dropdownItemsArray={['Off', 'On', 'System Theme']} description='Applies a dark theme to all interface components.' name='Dark Mode' enabled={userSettingsObj.interface.darkMode} changeFunction={function (status) {
            userSettingsObj.interface.darkMode = status


            cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
          }} />, document.getElementById('darkModeSettingsList'))



          // MORE SETTINGS!

          ReactDom.render(<span>
            <cUniUX.SettingItem action='toggle' default={false} description='Show a label next to toggle switches, to give information on their state.' name='Show Toggle Switch Labels' toggleOnText='Show Labels' enabled={userSettingsObj.interface.useToggleSwitchLabels} toggleOffText="Don't Show Labels" toggleFunction={function (status) {
              userSettingsObj.interface.useToggleSwitchLabels = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} />

            <cUniUX.SettingItem action='dropdown' dropdownItemsArray={['App Name', 'App Icon']} default={false} description="Choose whether to show the app's icon, or name, at the top-left of apps." name='App Titles' selectedItemIndex={userSettingsObj.interface.appIconOrName} changeFunction={function (status) {
              userSettingsObj.interface.appIconOrName = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} />

          </span>, document.getElementById('moreSettingsList'))
        }
      },

      content: <span>
        <h4>Accent Colour</h4>
        <span id='accentColourSetting' />

        {/* <p className={cUniUX.styles.minorText}>
          If enabled, apps that specify an accent colour will have their accent colour overridden by the one set by you here. If disabled, only apps that
          don't specify an accent colour will use your selection.
        </p> */}

        <h4>Dark Mode</h4>
        <span id='darkModeSettingsList' style={{ marginBottom: 50 }} />

        <h4>More Settings</h4>

        <span id='moreSettingsList' />

      </span>
    },

    privacyAndSecurity: {
      name: 'Privacy and Security',
      icon: cUniUX.icons.faShieldAlt,
      url: '',
      autoFirebase: {
        callbackFunction: function (fbObj) {
          userSettingsObj = fbObj.userSettings

          ReactDom.render(<span>

            <cUniUX.SettingItem action='dropdown' selectedItemIndex={userSettingsObj.privacyAndSecurity.askBeforeLinks} dropdownItemsArray={["Don't Ask", "Ask if Site is Unverified", "Always Ask"]} description="Ask before opening links to external sites, or showing external sites within the platform." name='External Site Security Warnings' changeFunction={function (status) {
              userSettingsObj.privacyAndSecurity.askBeforeLinks = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} />
          </span>,
            document.getElementById('securityStgs')
          )

          ReactDom.render(<span>
            <cUniUX.SettingItem action='dropdown' selectedItemIndex={userSettingsObj.privacyAndSecurity.useAutoLockTimeout} dropdownItemsArray={['Off', '3 minutes', '5 minutes', '10 minutes', '15 minutes', '20 minutes', '1 hour']} description="If your Circel account session is left idle for the set period of time, automatically log out of your Circel account for security. Clicks and moves of your mouse, touches of the screen and keys pressed, over the Circel client, count as activity." name='Automatic Inactivity Timeout' changeFunction={function (status) {
              
              cUniUX.changeAutoLockTimeout(status)
              userSettingsObj.privacyAndSecurity.useAutoLockTimeout = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} />
          </span>, document.getElementById('timeoutStg'))
        }
      },

      content: <span>
        <span className={cUniUX.styles.minorText}>
          Circel respects your privacy, and can help you stay even more secure and keep your details private from potential malice.
        </span><br/><br/>

        <h4>
          External Site Security
        </h4>

        <span id='securityStgs'/>


        <h4>
          Inactivity Timeout
        </h4>

        <span id='timeoutStg'/>
      </span>
    },


    accessibility: {
      name: 'Accessibility',
      icon: cUniUX.icons.faUniversalAccess,
      url: '',
      autoFirebase: {
        callbackFunction: function (fbObj) {
          userSettingsObj = fbObj.userSettings

          ReactDom.render(<span>
            {/* <cUniUX.SettingItem action='toggle' default={false} description='Increase the contrast between interface background colours.' name='Use Increased Contrast' toggleOnText='Yes' enabled={userSettingsObj.accessibility.useIncreasedContrast} toggleOffText="No" toggleFunction={function (status) {
              userSettingsObj.accessibility.useIncreasedContrast = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} /> */}

            <cUniUX.SettingItem action='toggle' default={false} description='Makes the borders between interface elements more obvious.' name='Use Obvious Partitioning' toggleOnText='Yes' enabled={userSettingsObj.accessibility.useObvPart} toggleOffText="No" toggleFunction={function (status) {
              userSettingsObj.accessibility.useObvPart = status


              cUniUX.setCFileData('/circel/u\\' + userUID + '/settings/settings.stgs', userSettingsObj)
            }} />
          </span>,
            document.getElementById('interfaceStgs')
          )
        }
      },

      content: <span>
        <span className={cUniUX.styles.minorText}>
          Adapt the Circel interface appearance for your individual needs and preferences.
        </span><br /><br />

        <h4>Interface</h4>

        <span id='interfaceStgs' />

      </span>
    }
  },
}


export { appConfig }