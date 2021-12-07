
import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from '../../components/uniux.js'
import { Link } from 'gatsby'
import * as firebaseSetup from '../../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

var currentUser

class Page extends React.Component{
  render(){
    return <body>
    <uniUX.Main pageType={'app'} pageName={'Settings'} content={
      <uniUX.ColumnedApp appConfig={uniUX.appConfigs.settings} page={uniUX.appConfigs.settings.pageConfigs.appearance}
      pageOptionButtons={[['Save changes', icons.faSave, function(){alert('hi')}, true]]} pageContent={
        <span>
        <h4>
          Coming Soon
        </h4>
        {/* <h4>
          Progressive Web App (PWA) Mode
        </h4>

        <p>
          Use PWA Mode when an app setting is detected
        </p>

        <p className={uniUX.styles.minorText}>
          When this setting is on, PWA Mode adapts UniUX for use in an app setting, as opposed to on the normal website. 
          When off, UniUX will instead keep the default settings when it detects you're in an app setting.
        </p>
        <br/><br/>

        <p>
          Override PWA Mode
        </p>

        <p className={uniUX.styles.minorText}>
          Overrides the automatic activation for PWA Mode (not recommended). When on, PWA Mode will always be on no matter the setting.

        </p> */}
        
        </span>
      }/>
    }>
    </uniUX.Main>
    </body>
  }
  
  componentDidMount(){

    // function tryToRenderUserDetails(){
    //   try{
    //     currentUser = firebaseSetup.firebaseAuth.getAuth().currentUser
    //     reactDom.render(currentUser.displayName, document.getElementById('settingsName'))
    //     document.getElementById('settingsPfp').src = currentUser.photoURL
    //     uniUX.getDocFromFirestore('userSettings', currentUser.uid).then(function(result){
    //       reactDom.render(<span>{'@' + result['username']}</span>, document.getElementById('settingsAcntUsername'))
    //    })
    //   } catch (error) {
    //     setTimeout(tryToRenderUserDetails, 50)
    //   }
    // }

    // tryToRenderUserDetails()
  }
}

export default Page
