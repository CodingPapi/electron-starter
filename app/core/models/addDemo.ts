import { Model } from './dva'
import { Draft } from 'immer'

type LoginType = 'loggedIN' | 'loggedOUT'
export const defaultState = {
  loginState: 'loggedOUT' as LoginType,
  loginPhoneNumber: '',
  userInfo: {
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
    brefInfo: '',
    avatarPath: '',
  },
}

export type LoginState = Readonly<typeof defaultState>

export default $tools.asType<Model>({
  namespace: 'userMgmt',
  state: defaultState,
  effects: {
    *login(action, { /* call, */ put }) {
      try {
        // const userName = 'hello';
        yield put({
          type: 'updateLoggin',
          payload: {
            loginState: 'loggedIN',
            phoneNumber: action.payload.phoneNumber || '',
          },
        })
      } catch (err) {}
    },
    *saveInfo(action, { /* call, */ put }) {
      try {
        yield put({
          type: 'updateInfo',
          payload: {
            userInfo: action.payload.userInfo || {},
          },
        })
      } catch (err) {}
    },
  },
  reducers: {
    updateLoggin(state: Draft<LoginState>, { payload }) {
      state.loginPhoneNumber = payload.phoneNumber
    },
    updateInfo(state: Draft<LoginState>, { payload }) {
      state.userInfo = {
        ...state.userInfo,
        ...payload.userInfo,
      }
    },
  },
})
