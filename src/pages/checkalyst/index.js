import * as React from "react"
import * as cUniUX from 'cuniux';

import { appConfig } from "../../components/appConfigs/tasks.js";


class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.App pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.indexPage}>

        
      </cUniUX.App>
    </body>
  }
}

export default Page
