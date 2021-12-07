import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from '../../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

class Page extends React.Component{
  render(){
    return <body>
    <uniUX.Main pageType={'app'} pageName={'Settings'} content={
      <uniUX.ColumnedApp appConfig={uniUX.appConfigs.settings} page={uniUX.appConfigs.settings.pageConfigs.home}
      pageOptionButtons={[['Save Changes', icons.faCheck, function(){alert('hi')}, 'themeColour'], ['Discard Changes', icons.faTimes, function(){alert('hi')}, '']]} firstColumnPageItems={
        uniUX.appConfigs.settings
      } pageContent={
        <span>
        <h4>
          Account
        </h4>
        <uniUX.FullWidthNavCard name='Account Settings' takeTo='/settings/account' content={<span>
          View your user profile, edit your account settings and more.
        </span>}/>

        <uniUX.FloatBr/>

        <h4>
          Appearance
        </h4>
        <uniUX.FullWidthNavCard name='Appearance Settings' takeTo='/settings/appearance' content={<span>
          Make UniUX yours.
        </span>}/>
        
        </span>
      }/>
    }>
    </uniUX.Main>
    </body>
  }
  
  componentDidMount(){
    const userAndSettings = uniUX.getDocFromFirestore('users', 'viggobf').then(function(result){
      // reactDom.render(<span>{result['name']}</span>, document.getElementById('settingsName'))
    })
  }
}

export default Page
