import * as cUniUX from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'
import LogoImage from '../../pages/icon.png'
import { projectConfig } from '../projectConfig.js'
import * as database from 'firebase/database'

var appIconSelection;
var iconArray = Object.keys(cUniUX.icons);
iconArray.splice(0, 2)

const appConfig = {
    name: 'AppPlatform',
    shortenedName: 'AppPlatform',
    icon: cUniUX.icons.faThLarge,
    rootURL: 'appPlatform',
    appCode: 'APL',
    initialAppData: {
        settings: {
            advancedMode: false
        }
    },
    loginRequired: true,
    design: {
        accentColour: cUniUX.colourPacks.blue,
    },


    pageConfigs: {
        indexPage: {
            name: "Build",
            icon: cUniUX.icons.faTools,
            pageOptionButtons: [['New App', cUniUX.icons.faPlus, 'accentColour', function (ev) {

            }, false]],
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    // cUniUX.
                }
            },

            content: <span>
                <h4>Quick Actions</h4>
                <cUniUX.LargeActionCard name='Create App' onClick={() => {
                    // start the app creation process
                    var nameRef = React.createRef()
                    var appName = null
                    var appFileData = null
                    var newAppObj = null
                    var codeRef = React.createRef()

                    cUniUX.initializeSubPage({
                        name: 'Create App',
                        icon: cUniUX.icons.faPlus,

                        content: <span>
                            <span className={cUniUX.styles.minorText}>
                                Creates a new AppPlatform Dynamic App (.app) cFile in your cDrive. To start building, provide essential app information
                                below. We'll then take you through other steps, before opening the AppPlatform IDE with your new app.
                            </span><br /><br />

                            <h4>Basic Information</h4>

                            <cUniUX.FullWidthBarCard>
                                <label for='appNameInput'>
                                    <strong style={{ fontSize: '15px' }}>App Name:</strong>
                                </label><br />
                                <input ref={nameRef} id='appNameInput' placeholder='User-facing app name' style={{ width: '98.4%', marginTop: '7px', marginBottom: '6px' }} /><br />

                                <span className={cUniUX.styles.minorText}>
                                    Your app's name is visible to users. Make sure it's appropriate and informative of what the app does.
                                </span>
                            </cUniUX.FullWidthBarCard>

                            <cUniUX.FullWidthBarCard>
                                <strong style={{ fontSize: '14.5px' }}>App Icon:</strong><br />
                                <cUniUX.VerticalSpacer height='6px' />
                                <span style={{ float: 'left' }}><cUniUX.Dropdown changeFunction={(value) => {
                                    appIconSelection = iconArray[value]
                                    ReactDom.render(<cUniUX.FontAwesomeIcon icon={cUniUX.icons[iconArray[value]]} />, document.getElementById('appIconPreview'))
                                }} placeholder="Select an icon" itemsArray={iconArray} /></span>&ensp;<span id='appIconPreview'>-</span><cUniUX.FloatBr />

                                <span className={cUniUX.styles.minorText}>
                                    Select an icon name, from the FontAwesome library, to preview it. Your app icon appears in quite a few places, some depending on user settings. Make sure it reflects the function
                                    of your app as accurately as possible. If you're not sure on an icon, use a blank square, which signifies an app, and
                                    you can always edit it later on.
                                </span>
                            </cUniUX.FullWidthBarCard>

                            <span style={{ float: 'right' }}><cUniUX.Button onClick={(ev) => {
                                appName = nameRef.current.value
                                newAppObj = {
                                    name: appName,
                                    icon: appIconSelection
                                }


                                cUniUX.newCFile(nameRef.current.value, 'app', newAppObj, ev, () => {
                                    var selAccentColour = 0
                                    cUniUX.initializeSubPage({
                                        name: 'Configure ' + nameRef.current.value,
                                        icon: cUniUX.icons.faCogs,

                                        content: <span>
                                            <span className={cUniUX.styles.minorText}>
                                                We successfully created your new app's cFile. Now, this step lets you add more configuration options for your app,
                                                before you begin building individual pages.
                                            </span>

                                            <h4>Additional Configuration</h4>

                                            <cUniUX.SettingItem selectedItemIndex={0} description="Select an accent colour for your app. If the user has Override App Accent Colours turned off, it'll appear in every colour-accented place within your app." name='App Accent Colour' action='dropdown' dropdownItemsArray={cUniUX.accentColoursArray} changeFunction={(val) => {
                                                selAccentColour = val
                                            }} />


                                            <span style={{ float: 'right' }}><cUniUX.Button type='primary' onClick={(ev) => {
                                                // add additional keys to the starting app object. We'll keep this around until we hand over to the IDE.
                                                newAppObj.design = {
                                                    accentColour: selAccentColour
                                                }

                                                cUniUX.updateCDriveCFile(appName, 'app', newAppObj, ev, function () {
                                                    cUniUX.undeclarePageLock()
                                                    cUniUX.backToParentPage()
                                                    cUniUX.alertDialog("Your app was set up!", "Coming in Alpha 5, you'll be able to use more advanced features and build Pages, etc, for your AppPlatform apps.")
                                                })
                                            }}>Confirm and Continue</cUniUX.Button></span>
                                        </span>
                                    })

                                    cUniUX.declarePageLock("Your new app's setup isn't finished", "you haven't completed your new app's setup yet")
                                })
                            }} type='primary'>Create App</cUniUX.Button></span>
                        </span>
                    })
                }} primary icon={cUniUX.icons.faPlus}>
                    Start building a new AppPlatform Dynamic App from scratch.
                </cUniUX.LargeActionCard>

                <cUniUX.LargeActionCard name='New App from Template' icon={cUniUX.icons.faPlusSquare}>
                    Create a new app from a pre-built template (coming soon).
                </cUniUX.LargeActionCard>

                <cUniUX.FloatBr />
            </span>
        },


        publish: {
            name: 'Publish',
            icon: cUniUX.icons.faChevronCircleRight,

            content: <span>
                <span className={cUniUX.styles.minorText}>
                    Coming soon - probably in a few Alphas' time.
                </span>
            </span>
        }
    },
}


export { appConfig }