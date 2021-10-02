import * as React from 'react'
import * as uniUI from '../../components/uniui.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

const MyCircelPage = () => {
  return (
    <body>
    <uniUI.Main appPage={true} pageName={'Settings'} content={
      <uniUI.ColumnedApp pageShortenedName='Circel' themeColour={'gainsboro'} pageTitle='Settings' firstColumnAppItems={
        [['Account', icons.faUser], ['Appearance', icons.faPaintBrush]]
      } secondColumnContent={
        <div>
        <h1>Settings</h1>
        <uniUI.SidebarItem text='Account' icon={icons.faReceipt}/>
        </div>
      } thirdColumnContent={
        <p>there</p>
      }/>
    }>
    </uniUI.Main>
    </body>
  )
}

export default MyCircelPage
