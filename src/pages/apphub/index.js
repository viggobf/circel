import * as React from "react"
import * as firebaseAuth from '@firebase/auth'
import { initializeApp } from "@firebase/app";
import * as firestore from '@firebase/firestore'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import * as cUniUX from 'cuniux'; import * as uniUX from 'uniux'
import { appConfig } from "../../components/appConfigs/apphub";

const IndexPage = () => {
  return (
    <cUniUX.Main appConfig={appConfig} page={appConfig.pageConfigs.home} pageType='columnedApp'>
      <cUniUX.SmallCard title='Title' children={<div onContextMenu={function (event) {
        cUniUX.contextMenu(event, [
          ['Stream App', function () { cUniUX.dialog('Apps of the Year 2021', <div>Hiya!</div>, ['Close', function () { alert('hi') }]) }],
          ['Configure Stream...', function () { alert('hi') }, true],
          ['Like', function () { alert('hi') }],
          ['Write a review...', function () { alert('hi') }],
          ['Report abuse to Circel...', function () { alert('hi') }],
        ])
      }}><strong>
          <h2>Apps of the Year 2021</h2>
        </strong>
        <p>
          The apps that made 2021.
        </p>
      </div>}>
        heya
      </cUniUX.SmallCard>
      <cUniUX.SmallCard title='Title' children={<div><strong>
        <h2>New Year, New Apps</h2>
      </strong>
        <p>
          The apps we're hyped for in 2022.
        </p>
      </div>}>
        heya
      </cUniUX.SmallCard>
      <cUniUX.SmallCard title='Title' children={<div><strong>
        <h2>Hot Today</h2>
      </strong>
        <p>
          Apps getting all the streams today.
        </p>
      </div>}>
        heya
      </cUniUX.SmallCard>
    </cUniUX.Main>
  )
}

export default IndexPage
