import * as React from 'react'
import ReactDom from 'react-dom'
import * as uniUX from 'uniux'
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import { appConfig } from '../components/appConfigs/uniux/website-pages.js'

var url;

class Page extends React.Component {
    render() {
        return (<body id='authActionRenderSpace'>
            <uniUX.Main appConfig={appConfig} pageType={'custom'} pageName={'Reset Password'} content={
                <div className={uniUX.styles.halvedPageGrid}>
                    <div className={uniUX.styles.halvedPageHalf}>
                        <br /><br />
                        {/* loading it up */}
                        <span className={uniUX.styles.minorText}>
                            Loading...
                        </span>

                    </div>
                </div>
            }>
            </uniUX.Main>
        </body>
        )
    }




    componentDidMount(){
        url = new URL(window.location.href)
        var continueUrl
        if (url.searchParams.get('continueUrl')) {
            continueUrl = url.searchParams.get('continueUrl')
        } else {
            continueUrl = 'https://circel.co/'
        }
        if (url.searchParams.get('mode') == 'resetPassword') {
            uniUX.verifyPasswordResetCode(url.searchParams.get('oobCode')).then(function (result) {
                if (result == 'error') {
                    ReactDom.render(<body>
                        <uniUX.Main appConfig={appConfig} pageType={'custom'} pageName={'Reset Password'} content={
                            <div className={uniUX.styles.halvedPageGrid}>
                                <div className={uniUX.styles.halvedPageHalf}>
                                    <br /><br />
                                    <h1 className={uniUX.styles.bigPageHeader} style={{ textAlign: 'left' }}>Reset Password</h1>
                                    {/* uh oh, that link's invalid! */}
                                    <span className={uniUX.styles.minorText}>
                                        This password reset link is invalid. It may have expired, or may have already been used.<br /><br />

                                        You can get a new link by entering your Circel ID and clicking 'Forgot Password' at <Link to='/login'>Log In</Link>.
                                    </span>

                                </div>
                            </div>
                        }>
                        </uniUX.Main>
                    </body>,
                    document.getElementById('authActionRenderSpace')
                    )
                } else {
                    ReactDom.render(
                        <body>
                            <uniUX.Main appConfig={appConfig} pageType={'custom'} pageName={'Reset Password'} content={
                                <div className={uniUX.styles.halvedPageGrid}>
                                    <div className={uniUX.styles.halvedPageHalf}>
                                        <br /><br />
                                        <h1 className={uniUX.styles.bigPageHeader} style={{ textAlign: 'left' }}>Reset Password</h1>

                                        <span className={uniUX.styles.minorText}>
                                            You're resetting the password for the Circel account with the Circel ID <em>{result}</em>.
                                        </span><br/><br/>


                                        <input placeholder={'New Password'} style={{ width: '30vw' }} type='password' id='resetPasswordNewPassword' /><br /><br /><br />

                                        <uniUX.PrimaryButton text='Reset Password' onClick={function () {
                                            uniUX.completeResetPassword(result, document.getElementById('resetPasswordNewPassword').value, url.searchParams.get('oobCode')).then(function (result) {
                                                window.open(continueUrl, '_self')
                                            })
                                        }} /><br /><br />
                                        <span className={uniUX.styles.minorText}>
                                            Clicking 'Continue' will also log you in and then take you to <em>{continueUrl}</em>.
                                        </span><br /><br />

                                        {/* place where errors are rendered */}
                                        <span id='errorRenderSpace' className={uniUX.styles.minorText} style={{ color: 'var(--red)' }}></span>

                                    </div>
                                </div>
                            }>
                            </uniUX.Main>
                        </body>,
                        document.getElementById('authActionRenderSpace')
                    )
                }
            })
        }




        // user wants to verify their Circel ID (email address)?
        else if (url.searchParams.get('mode') == 'verifyEmail') {
            ReactDom.render(
                <body>
                    <uniUX.Main appConfig={appConfig} pageType={'custom'} pageName={'Verify your Circel ID'} content={
                        <div className={uniUX.styles.halvedPageGrid}>
                            <div className={uniUX.styles.halvedPageHalf}>
                                <br /><br />
                                <h1 className={uniUX.styles.bigPageHeader} style={{ textAlign: 'left' }}>Verify your Circel ID</h1>

                                <input placeholder='New Password' style={{ width: '30vw' }} type='password' id='resetPasswordNewPassword' /><br /><br /><br />

                                <uniUX.PrimaryButton text='Continue' onClick={function () {
                                    uniUX.completeResetPassword(document.getElementById('resetPasswordNewPassword').value, url.searchParams.get('oobCode')).then(function (result) {
                                        if (result == 'success') {
                                            if (url.searchParams.get('continueUrl')) {
                                                window.open(url.searchParams.get('continueUrl'), '_self')
                                            }
                                        } else {
                                            console.log(result)
                                            if (result == 'auth/invalid-email') {
                                                ReactDom.render(<span>That Circel ID doesn't match any Circel account.</span>, document.getElementById('errorRenderSpace'))
                                            } else if (result == 'auth/wrong-password') {
                                                ReactDom.render(<span>That password doesn't match your Circel ID - please try again.</span>, document.getElementById('errorRenderSpace'))
                                            } else if (result == 'auth/user-disabled') {
                                                ReactDom.render(<span>This Circel account has been disabled.</span>, document.getElementById('errorRenderSpace'))
                                            } else {
                                                ReactDom.render(<span>An error occurred (<code>{result.split('/')[1]}</code>)</span>, document.getElementById('errorRenderSpace'))
                                            }
                                        }
                                    })
                                }} /><br /><br />
                                <span className={uniUX.styles.minorText}>
                                    Clicking 'Continue' will take you to <em>{continueUrl}</em>.
                                </span><br /><br />

                                {/* place where errors are rendered */}
                                <span id='errorRenderSpace' className={uniUX.styles.minorText} style={{ color: 'var(--red)' }}></span>

                            </div>
                        </div>
                    }>
                    </uniUX.Main>
                </body>,
                document.getElementById('authActionRenderSpace')
            )
        }
    }
}

export default Page
