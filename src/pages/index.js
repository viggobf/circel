import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from 'uniux'
import { Link } from 'gatsby'
import * as firebaseSetup from '../components/firebasesetup.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

class Page extends React.Component{
  render(){
    return <body>
    <uniUX.Main pageType={'app'} pageName={'Home'} content={
      <uniUX.ColumnedApp appConfig={uniUX.appConfigs.home} page={uniUX.appConfigs.home.pageConfigs.home}
      pageOptionButtons={[]} pageContent={
        <span>
        <h4>
          More coming soon
        </h4>
        <p>
          This page is yet to be worked on, but in the meantime here's some pages that have more to them that you might want to visit.
        </p>
        <uniUX.FullWidthNavCard name='Visit your Settings' takeTo='/settings/' content={<span>
          Edit Account info, change Appearance (coming soon), plus more to come.
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
