import * as React from "react"
import * as firebaseAuth from '@firebase/auth'
import { initializeApp } from "@firebase/app";
import * as firestore from '@firebase/firestore'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import * as cUniUX from 'cuniux'; 
import { appConfig } from "../../components/appConfigs/apphub";

const IndexPage = () => {
  return (
    <cUniUX.App appConfig={appConfig} page={appConfig.pageConfigs.indexPage} pageType='columnedApp'/>
  )
}

export default IndexPage
