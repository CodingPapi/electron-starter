import { Model } from './dva'
import { Draft } from 'immer'

export const defaultState = {
  count: 0,
}

export type DemoType = Readonly<typeof defaultState>

export default $tools.asType<Model>({
  namespace: 'addDemo',
  state: defaultState,
  effects: {
    *addSync(action, { /* call, */ put }) {
      try {
        // const userName = 'hello';
        yield put({
          type: 'updateCount',
          payload: {
            count: action.payload.count + 1,
          },
        })
      } catch (err) {}
    },
  },
  reducers: {
    updateCount(state: Draft<DemoType>, { payload }) {
      state.count = payload.phoneNumber
    },
  },
})
