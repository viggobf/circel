import * as React from "react"
import * as cUniUX from 'cuniux';
import * as uniUX from 'uniux'
import { appConfig } from "../../components/appConfigs/admin/cdsAdminCtr";


class Page extends React.Component {
  render() {
    return <body>
      <cUniUX.App pageType={'columnedApp'} appConfig={appConfig} page={appConfig.pageConfigs.home}>

        
      </cUniUX.App>
    </body>
  }
}

export default Page
