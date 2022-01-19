import * as React from 'react'
import reactDom from 'react-dom'
import * as uniUX from 'uniux'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as IonIcons from 'react-ionicons'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'
import {appConfig} from '../components/appConfigs/home.js'
// import {initializeApp} from '@firebase/app'
// import * as firebaseAuth from '@firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyDGFdDCD1ZwvOzbvtWNxseRpSfOOz5dAro",
//   authDomain: "circel-app.firebaseapp.com",
//   projectId: "circel-app",
//   storageBucket: "circel-app.appspot.com",
//   messagingSenderId: "121186697586",
//   appId: "1:121186697586:web:93874da3a21c182b219deb",
//   measurementId: "G-72PCDLGBEL"
// };
// const app = initializeApp(firebaseConfig)
// const auth = firebaseAuth.getAuth()

class Page extends React.Component {
  render() {
    return <body>
      <uniUX.Main pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.home}>
        <h4>
          More coming soon
        </h4>
        <p>
          This page is yet to be worked on, but in the meantime here's some pages that have more to them that you might want to visit.
        </p>
        <uniUX.FullWidthNavCard name='Visit your Settings' takeTo='/settings/' content={<span>
          Edit Account info, change Appearance (coming soon), plus more to come.
        </span>} />

      </uniUX.Main>
    </body>
  }

  componentDidMount() {
  }
}

export default Page
