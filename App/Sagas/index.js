import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { AirLineTypes } from '../Redux/AirLineRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, twitterLogin, facebookLogin, googleLogin, phoneLogin } from './LoginSagas'
import { getUserAvatar } from './GithubSagas'
import { getAirLines } from './AirLineSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    //takeLatest(StartupTypes.STARTUP, startup),
    //takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.TWITTER_LOGIN_REQUEST, twitterLogin, api),
    takeLatest(LoginTypes.FACEBOOK_LOGIN_REQUEST, facebookLogin, api),
    takeLatest(LoginTypes.GOOGLE_LOGIN_REQUEST, googleLogin, api),
    takeLatest(LoginTypes.PHONE_LOGIN_REQUEST, phoneLogin, api),
    takeLatest(AirLineTypes.GET_AIR_LINES_REQUEST, getAirLines, api),
    // some sagas receive extra parameters in addition to an action
    //takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
