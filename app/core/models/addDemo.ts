import { Model } from './dva'
import { Draft } from 'immer'
import { asType } from '../tools/utils'

export const defaultState = {
  count: 0,
}

export type DemoType = Readonly<typeof defaultState>

export default asType<Model>({
  namespace: 'addDemo',
  state: defaultState,
  effects: {
    *addSync(action, { /* call, */ put }) {
      try {
        // const userName = 'hello';
        yield put({
          type: 'updateCount',
          payload: {
            count: action.payload.count,
          },
        })
      } catch (err) {}
    },
  },
  reducers: {
    updateCount(state: Draft<DemoType>, { payload }) {
      state.count = payload.count
    },
  },
})
