import * as cUniUX from 'cuniux'
import { initializeApp } from '@firebase/app'
import { projectConfig } from '../projectConfig.js'
import React from 'react';
import reactDom from 'react-dom';

var tasksArray = []
var tasksLitArray = []

class Task extends React.Component {
    constructor(props) {
        super(props)

        this.state = { styleOpacity: '1', styleDisplay: '' }
    }

    render() {
        return <cUniUX.EventWrapper contextMenu={[['Mark as Complete', () => { this.fadeOut() }]]}>
            <cUniUX.FullWidthBarCard style={{ transition: 'all 0.6s', opacity: this.state.styleOpacity, display: this.state.styleDisplay }}>{this.props.name}<span style={{ float: 'right' }}><cUniUX.Checkbox toggleFunction={(val) => { if (val) { this.fadeOut() } }} /></span></cUniUX.FullWidthBarCard>
        </cUniUX.EventWrapper>
    }

    fadeOut() {
        this.setState({ styleOpacity: '0', styleDisplay: '' })
        setTimeout(() => {
            this.setState({ styleOpacity: '0', styleDisplay: 'none' })
        }, 790)

        tasksLitArray.splice(tasksLitArray.indexOf(this.props.name), 1)
        cUniUX.updateAppData({ tasks: tasksLitArray })

        tasksArray = []
        tasksLitArray.forEach((item) => {
            tasksArray.push(<Task name={item} />)
        })
    }
}

const appConfig = {
    parentProject: projectConfig,

    name: 'Tasks',
    appCode: 'TSK',
    initialAppData: {
        tasks: []
    },
    loginRequired: true,
    icon: cUniUX.icons.faListUl,
    rootURL: '/',
    // appOptionButtons: [['New Checkalyst']]
    design: {
        // themeColour:{
        //     normal: 'rgb(13, 69, 100)',
        //     light: 'rgb(13, 69, 100)',
        //     mostLight: 'rgb(13, 69, 100)',
        // },
        themeColour: cUniUX.colourPacks.mustard,
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
            // alert(fbObj.appData.myVar)
        }
    },
    pageConfigs: {
        indexPage: {
            name: 'All Tasks',
            icon: cUniUX.icons.faList,
            url: '',
            pageOptionButtons: [['New Task', cUniUX.icons.faPlus, 'themeColour', function () {
                var ref1 = React.createRef()

                cUniUX.dialog('New Task', <span>
                    <input placeholder='Task Name' ref={ref1} onChange={function (v) { console.log(v) }} />
                </span>, [['Create Task', function () {
                    if (ref1.current.value !== "") {
                        var val = ref1.current.value
                        tasksLitArray.push(val)
                        cUniUX.updateAppData({ tasks: tasksLitArray })
                        tasksArray.push(<Task name={val} />)
                        setTimeout(function () {
                            reactDom.render(null, document.getElementById('taskList'))
                            reactDom.render(tasksArray, document.getElementById('taskList'), function () {
                                cUniUX.closeDialog()
                            })
                        }, 1)
                    }
                }, true]])
            }]],
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    if (fbObj.appData.tasks.length > 0){
                        tasksArray = []
                        tasksLitArray = []
                        fbObj.appData.tasks.forEach((item) => {
                            tasksLitArray.push(item)
                            tasksArray.push(<Task name={item} />)
                        })

                        reactDom.render(tasksArray, document.getElementById('taskList'))
                    } else {
                        tasksArray = []
                        tasksLitArray = []
                        reactDom.render(<span>
                            <strong>No tasks in your list! Click 'New Task' to create one.</strong>
                        </span>, document.getElementById('taskList'))
                    }
                }
            },

            content: <span>
                <span id='taskList'>
                    {/* tasks are rendered here */}
                </span>
            </span>
        },

        // settings: {
        //     name: 'Settings',
        //     icon: cUniUX.icons.faCog,
        //     url: '',
        //     pageOptionButtons: [['Reset to Default', cUniUX.icons.faUndo, 'normal', function () {
        //         cUniUX.updateAppData({ tasks: tasksLitArray, settings: { autoDeleteCompleted: true } })
        //     }]],

        //     content: <span></span>
        // }
    },
}

export { appConfig }