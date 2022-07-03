// CIRCEL DATA SYSTEM ADMINISTRATION CONSOLE
import * as icons from '@fortawesome/free-solid-svg-icons'
import { colourPacks, getCFile, getCFileRealtime, Button, writeToCFile, updateCFile, contextMenu, dialog, confirm, updateUserProfilePicture, FontAwesomeIcon, alertDialog, styles, BarCard, ActionCard, FloatBr, ToggleSwitch } from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'
import LogoImage from '../../pages/icon.png'
import { projectConfig } from '../projectConfig.js'
import * as database from 'firebase/database'
import * as firestore from 'firebase/firestore'


var somethingBlocked = false

const appConfig = {
    parentProject: projectConfig,

    name: 'Administration Centre',
    shortenedName: 'Admin Centre',
    appCode: 'ADC',
    icon: icons.faUsersCog,
    rootURL: 'admin',
    appOptionButtons: [['Lock CDS', icons.faLock, function(){
        confirm('Lock CDS?', "Users won't be able to read, update, create or delete cFiles on the CDS until you unlock it. Continue?", "Lock CDS", function () {
            writeToCFile('cds/status', {
                allowCreates: false,
                allowReads: false,
                allowDeletes: false,
                allowUpdates: false
            }).then(function () {
                alertDialog('CDS Lock complete', "The CDS won't allow reads, updates, creates or deletes until you re-enable them through the Console.")
            }).catch(function () {

            })
        })
    }], ['Unlock CDS', icons.faUnlock, function(){
        writeToCFile('cds/status', {
            allowCreates: true,
            allowReads: true,
            allowDeletes: true,
            allowUpdates: true
        }).then(function () {
            alertDialog('CDS Unlock complete', "The CDS will allow reads, updates, creates or deletes for all users, in line with document preferences.")
        }).catch(function () {
        })
    }]],
    access: {
        emailIs: 'viggobryantfrost@gmail.com',
        phoneNumberIs: '! 0249001034',
        emailDomainIs: 'gmail.com'
    },
    loginRequired: true,
    design: {
        themeColour: colourPacks.yellow,
    },
    pageConfigs: {
        indexPage: {
            name: 'Dashboard',
            url: '/',
            icon: icons.faTachometerAlt,
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    getCFileRealtime('cds/status', function (data) {
                        // alert('hello' + data)
                        somethingBlocked = false
                        // get if reads are enabled, render the status
                        if (data.allowReads == true) {
                            var readsAllowColour = 'green'
                            var readsAllowText = 'Allowed'
                            var allowReadsMark = icons.faCheckCircle
                        } else {
                            var readsAllowColour = 'red'
                            var readsAllowText = 'Blocked'
                            var allowReadsMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(React.createElement(BarCard, null, <span>Reads:&ensp;<span style={{ color: readsAllowColour }}><FontAwesomeIcon icon={allowReadsMark} />&ensp;{readsAllowText}</span></span>), document.getElementById('allowReadsMarkArea'))


                        // same for creates
                        if (data.allowCreates == true) {
                            var createsAllowColour = 'green'
                            var createsAllowText = 'Allowed'
                            var allowCreatesMark = icons.faCheckCircle
                        } else {
                            var createsAllowColour = 'red'
                            var createsAllowText = 'Blocked'
                            var allowCreatesMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(React.createElement(BarCard, {}, <span>Creates:&ensp;<span style={{ color: createsAllowColour }}><FontAwesomeIcon icon={allowCreatesMark} />&ensp;{createsAllowText}</span></span>), document.getElementById('allowCreatesMarkArea'))


                        // same for updates
                        if (data.allowUpdates == true) {
                            var updatesAllowColour = 'green'
                            var updatesAllowText = 'Allowed'
                            var allowUpdatesMark = icons.faCheckCircle
                        } else {
                            var updatesAllowColour = 'red'
                            var updatesAllowText = 'Blocked'
                            var allowUpdatesMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(React.createElement(BarCard, {}, <span>Updates:&ensp;<span style={{ color: updatesAllowColour }}><FontAwesomeIcon icon={allowUpdatesMark} />&ensp;{updatesAllowText}</span></span>), document.getElementById('allowUpdatesMarkArea'))



                        // same for deletes
                        if (data.allowDeletes == true) {
                            var deletesAllowColour = 'green'
                            var deletesAllowText = 'Allowed'
                            var allowDeletesMark = icons.faCheckCircle
                        } else {
                            var deletesAllowColour = 'red'
                            var deletesAllowText = 'Blocked'
                            var allowDeletesMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(React.createElement(BarCard, {}, <span>Deletes:&ensp;<span style={{ color: deletesAllowColour }}><FontAwesomeIcon icon={allowDeletesMark} />&ensp;{deletesAllowText}</span></span>), document.getElementById('allowDeletesMarkArea'))

                        if (somethingBlocked === true) {
                            ReactDom.render(<span className={styles.minorText}><FontAwesomeIcon icon={icons.faExclamationCircle} />
                                &ensp;Warning: users' access to the CDS is currently restricted. To avoid confusion and other issues, make sure users are notified
                                if the restrictions are in force for a significant period of time.
                            </span>, document.getElementById('restrictionWarningTextArea'))
                        } else {
                            ReactDom.render(null, document.getElementById('restrictionWarningTextArea'))
                        }
                    })
                }
            },
            pageOptionButtons: [['Lock CDS', icons.faLock, 'normal', function (ev) {
                confirm('Lock CDS?', "Users won't be able to read, update, create or delete cFiles on the CDS until you unlock it. Continue?", "Lock CDS", function () {
                    writeToCFile('cds/status', {
                        allowCreates: false,
                        allowReads: false,
                        allowDeletes: false,
                        allowUpdates: false
                    }).then(function () {
                        alertDialog('CDS Lock complete', "The CDS won't allow reads, updates, creates or deletes until you re-enable them through the Console.")
                    }).catch(function () {

                    })
                }, ev)
            }], ['Unlock CDS', icons.faLockOpen, 'normal', function () {
                writeToCFile('cds/status', {
                    allowCreates: true,
                    allowReads: true,
                    allowDeletes: true,
                    allowUpdates: true
                }).then(function () {
                    alertDialog('CDS Unlock complete', "The CDS will allow reads, updates, creates or deletes for all users, in line with document preferences.")
                }).catch(function () {
                })
            }]],

            content: <span>
                {/* <span style={{ float: 'left' }}>
                    <h3 id='settingsName' style={{ marginTop: '8px', marginBottom: '8px' }} />
                    <span className={styles.minorText} id='currentSubcircel' style={{}} />
                </span>
                <p className={styles.minorText}>

                    This app allows you to administrate and control settings for the Universal Circel Data System (UCDS). Users will automatically be notified when Read or Write access settings
                    are modified. You should normally only disable these settings for scheduled maintenance, or in exteme cases a system lockdown.

                 </p><br /><br />*/}


                <h3>
                    CDS Status
                </h3>

                <span id='allowReadsMarkArea'>
                </span>

                <span id='allowCreatesMarkArea'>
                </span>

                <span id='allowUpdatesMarkArea'>
                </span>

                <span id='allowDeletesMarkArea'>
                </span>

                <FloatBr />

                <span id='restrictionWarningTextArea' />

                <FloatBr /><br />


                <h3>
                    Quick Actions
                </h3>

                <ActionCard icon={icons.faLock} action={function (ev) {
                    confirm('Lock CDS?', "Users won't be able to read, update, create or delete cFiles on the CDS until you unlock it. Continue?", "Lock CDS", function () {
                        writeToCFile('cds/status', {
                            allowCreates: false,
                            allowReads: false,
                            allowDeletes: false,
                            allowUpdates: false
                        }).then(function () {
                            alertDialog('CDS Lock complete', "The CDS won't allow reads, updates, creates or deletes until you re-enable them through the Console.")
                        }).catch(function () {

                        })
                    }, ev)
                }}>
                    Lock CDS
                </ActionCard>

                <ActionCard icon={icons.faLockOpen} action={function () {
                    writeToCFile('cds/status', {
                        allowCreates: true,
                        allowReads: true,
                        allowDeletes: true,
                        allowUpdates: true
                    }).then(function () {
                        alertDialog('CDS Unlock complete', "The CDS will allow reads, updates, creates or deletes for all users, in line with document preferences.")
                    }).catch(function () {

                    })
                }}>
                    Unlock CDS
                </ActionCard>


            </span>
        },





        cds: {
            name: 'CDS',
            url: '/',
            icon: icons.faDatabase,
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    getCFileRealtime('cds/status', function (data) {
                        // alert('hi' + data)
                        somethingBlocked = false
                        // get if reads are enabled, render the status
                        if (data.allowReads == true) {
                            var readsAllowColour = 'green'
                            var readsAllowText = 'Allowed'
                            var allowReadsMark = icons.faCheckCircle
                        } else {
                            var readsAllowColour = 'red'
                            var readsAllowText = 'Blocked'
                            var allowReadsMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(null, document.getElementById('allowReadsMarkArea'))
                        ReactDom.render(React.createElement(BarCard, null, <span style={{ float: 'left', width: 'fit-content' }}>Allow Reads<span style={{ width: 'fit-content', float: 'right' }}>&emsp;<ToggleSwitch onText='Allowed' offText='Not Allowed' toggleFunction={function (status) {
                            updateCFile('cds/status', { allowReads: status })
                            if (!status) {
                                ReactDom.render(<span className={styles.minorText}><FontAwesomeIcon icon={icons.faExclamationCircle} />
                                    &ensp;Warning: users' access to the CDS is currently restricted. To avoid confusion and other issues, make sure users are notified
                                    if the restrictions are in force for a significant period of time.
                                </span>, document.getElementById('restrictionWarningTextArea'))
                            }
                        }} enabled={data.allowReads} /></span></span>), document.getElementById('allowReadsMarkArea'))

                        // same for creates
                        if (data.allowCreates == true) {
                            var createsAllowColour = 'green'
                            var createsAllowText = 'Allowed'
                            var allowCreatesMark = icons.faCheckCircle
                        } else {
                            var createsAllowColour = 'red'
                            var createsAllowText = 'Blocked'
                            var allowCreatesMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(null, document.getElementById('allowCreatesMarkArea'))
                        ReactDom.render(React.createElement(BarCard, null, <span style={{ float: 'left', width: 'fit-content' }}>Allow Creates<span style={{ width: 'fit-content', float: 'right' }}>&emsp;<ToggleSwitch onText='Allowed' offText='Not Allowed' toggleFunction={function (status) {
                            updateCFile('cds/status', { allowCreates: status })
                            if (!status) {
                                ReactDom.render(<span className={styles.minorText}><FontAwesomeIcon icon={icons.faExclamationCircle} />
                                    &ensp;Warning: users' access to the CDS is currently restricted. To avoid confusion and other issues, make sure users are notified
                                    if the restrictions are in force for a significant period of time.
                                </span>, document.getElementById('restrictionWarningTextArea'))
                            }
                        }} enabled={data.allowCreates} /></span></span>), document.getElementById('allowCreatesMarkArea'))


                        // same for updates
                        if (data.allowUpdates == true) {
                            var updatesAllowColour = 'green'
                            var updatesAllowText = 'Allowed'
                            var allowUpdatesMark = icons.faCheckCircle
                        } else {
                            var updatesAllowColour = 'red'
                            var updatesAllowText = 'Blocked'
                            var allowUpdatesMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(null, document.getElementById('allowUpdatesMarkArea'))
                        ReactDom.render(React.createElement(BarCard, null, <span style={{ float: 'left', width: 'fit-content' }}>Allow Updates<span style={{ width: 'fit-content', float: 'right' }}>&emsp;<ToggleSwitch onText='Allowed' offText='Not Allowed' toggleFunction={function (status) {
                            updateCFile('cds/status', { allowUpdates: status })
                            if (!status) {
                                ReactDom.render(<span className={styles.minorText}><FontAwesomeIcon icon={icons.faExclamationCircle} />
                                    &ensp;Warning: users' access to the CDS is currently restricted. To avoid confusion and other issues, make sure users are notified
                                    if the restrictions are in force for a significant period of time.
                                </span>, document.getElementById('restrictionWarningTextArea'))
                            }
                        }} enabled={data.allowUpdates} /></span></span>), document.getElementById('allowUpdatesMarkArea'))



                        // same for deletes
                        if (data.allowDeletes == true) {
                            var deletesAllowColour = 'green'
                            var deletesAllowText = 'Allowed'
                            var allowDeletesMark = icons.faCheckCircle
                        } else {
                            var deletesAllowColour = 'red'
                            var deletesAllowText = 'Blocked'
                            var allowDeletesMark = icons.faTimesCircle
                            somethingBlocked = true
                        }

                        ReactDom.render(null, document.getElementById('allowDeletesMarkArea'))
                        ReactDom.render(React.createElement(BarCard, null, <span style={{ float: 'left', width: 'fit-content' }}>Allow Deletes<span style={{ width: 'fit-content', float: 'right' }}>&emsp;<ToggleSwitch onText='Allowed' offText='Not Allowed' toggleFunction={function (status) {
                            updateCFile('cds/status', { allowDeletes: status })
                            if (!status) {
                                ReactDom.render(<span className={styles.minorText}><FontAwesomeIcon icon={icons.faExclamationCircle} />
                                    &ensp;Warning: users' access to the CDS is currently restricted. To avoid confusion and other issues, make sure users are notified
                                    if the restrictions are in force for a significant period of time.
                                </span>, document.getElementById('restrictionWarningTextArea'))
                            }
                        }} enabled={data.allowDeletes} /></span></span>), document.getElementById('allowDeletesMarkArea'))

                        if (somethingBlocked === true) {
                            ReactDom.render(<span className={styles.minorText}><FontAwesomeIcon icon={icons.faExclamationCircle} />
                                &ensp;Warning: users' access to the CDS is currently restricted. To avoid confusion and other issues, make sure users are notified
                                if the restrictions are in force for a significant period of time.
                            </span>, document.getElementById('restrictionWarningTextArea'))
                        } else {
                            ReactDom.render(null, document.getElementById('restrictionWarningTextArea'))
                        }
                    })

                }
            },

            content: <span>
                <p className={styles.minorText}>
                    Access and control settings for the Circel Data System (CDS). Changes made here will affect all users and uses of the platform, except for
                    reads of the CDS status by cUniUX and CDS Security.
                </p>


                <h3>
                    Control Access
                </h3>

                <span id='allowReadsMarkArea'>
                </span>

                <span id='allowCreatesMarkArea'>
                </span>

                <span id='allowUpdatesMarkArea'>
                </span>

                <span id='allowDeletesMarkArea'>
                </span>

                <FloatBr />

                <span id='restrictionWarningTextArea' />
            </span>
        },
    }
}

export { appConfig }