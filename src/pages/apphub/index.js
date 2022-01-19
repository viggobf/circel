import * as React from "react"
import * as firebaseAuth from '@firebase/auth'
import { initializeApp } from "@firebase/app";
import * as firestore from '@firebase/firestore'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import * as uniUX from 'uniux'
import { appConfig } from "../../components/appConfigs/apphub";

const IndexPage = () => {
  return (
    <uniUX.Main appConfig={appConfig} page={appConfig.pageConfigs.home} pageType='columnedApp'>
      <uniUX.SmallCard title='Title' content={<div onContextMenu={function (event) {
        uniUX.contextMenu(event, [
          ['Stream App', function () { uniUX.dialog('Apps of the Year 2021', <div>Hiya!</div>, ['Close', function () { alert('hi') }]) }],
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
      </uniUX.SmallCard>
      <uniUX.SmallCard title='Title' content={<div><strong>
        <h2>New Year, New Apps</h2>
      </strong>
        <p>
          The apps we're hyped for in 2022.
        </p>
      </div>}>
        heya
      </uniUX.SmallCard>
      <uniUX.SmallCard title='Title' content={<div><strong>
        <h2>Hot Today</h2>
      </strong>
        <p>
          Apps getting all the streams today.
        </p>
      </div>}>
        heya
      </uniUX.SmallCard>
    </uniUX.Main>
  )
}

export default IndexPage
