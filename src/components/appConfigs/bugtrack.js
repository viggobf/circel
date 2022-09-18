import * as icons from '@fortawesome/free-solid-svg-icons'
import * as cUniUX from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'
import { projectConfig } from '../../components/projectConfig.js';


const appConfig = {
    parentProject: projectConfig,

    name: 'BugTrack Pro',
    icon: cUniUX.icons.faBug,
    appCode: 'BTP',
    rootURL: 'bugtrack',
    initialAppData: {},
    appOptionButtons: [['New Bug', cUniUX.icons.faPlus, function(){cUniUX.alertDialog('Created Bug', 'yeah its done')}]],
    design: {
        accentColour: cUniUX.colourPacks.purple
    },


    pageConfigs: {
        indexPage: {
            name: 'All Bugs',
            icon: cUniUX.icons.faListUl,
            url: '/',

            content: <span>
                {/* <span className={cUniUX.styles.minorText}>
                    All bugs you add will appear here.
                </span> */}

                <table style={{width: '100%'}}>
                    <tr>
                        <th style={{textAlign: 'left'}}>
                            Bug Name
                        </th>
                        <th style={{textAlign: 'right'}}>
                            Date Created
                        </th>
                        <th style={{textAlign: 'right'}}>
                            Severity
                        </th>
                    </tr>

                    <tr>
                        <td>
                            Fix problems with hiding sidebar.
                        </td>

                        <td style={{textAlign: 'right'}}>
                            12/6/22
                        </td>

                        <td style={{textAlign: 'right'}}> 
                            Moderate
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Improve dialogs and their sizing
                        </td>

                        <td style={{textAlign: 'right'}}>
                            29/5/22
                        </td>

                        <td style={{textAlign: 'right'}}> 
                            Low
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Another test bug
                        </td>

                        <td style={{textAlign: 'right'}}>
                            29/5/22
                        </td>

                        <td style={{textAlign: 'right'}}> 
                            Low
                        </td>
                    </tr>
                </table>

                <br/><br/>


                <cUniUX.SettingItem name='Allow User Reports' description='Allow users to submit bug reports through the Circel platform.' action='toggle' enabled={false} toggleFunction={function(status){alert(status)}}/>
            </span>
        }
    }
}


export {appConfig}