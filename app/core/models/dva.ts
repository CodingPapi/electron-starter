import createLoading from 'dva-loading'
import createImmer from 'dva-immer'
import { models, initialState, GlobalState } from 'src/models'
import { create } from 'dva-core'
export interface Options {
  models: Model[]
  // extraReducers: any;
  initialState: GlobalState
  onError: (e: any) => void
  // onAction: any[];
}

export function dvaCreateApp() {
  const options: Options = {
    models,
    initialState,
    onError: (e) => {
      console.log('Error happens: ' + e)
    },
  }
  const app = create(options)
  app.use(createLoading({}))
  app.use(createImmer())
  // HMR workaround
  if (!global.registered) {
    options.models.forEach((model: Model) => app.model(model))
  }
  global.registered = true

  app.start()
  const store = app._store

  app.getStore = () => store

  return app
}

import { Reducer, Action, ReducersMapObject, Dispatch } from 'redux'

export interface EffectsCommandMap {
  put: <A extends Action>(action: A) => any
  call: Function
  select: Function
  take: Function
  cancel: Function
  [key: string]: any
}
export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType
}
export type ReducerEnhancer = (reducer: Reducer<any>) => void
export interface SubscriptionAPI {
  dispatch: Dispatch<any>
}
export interface ActionWithPayload {
  action: Action
  payload: any
}
export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle'
export type EffectWithType = [Effect, { type: EffectType }]
export type Effect = (action: ActionWithPayload, effects: EffectsCommandMap) => void
export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer]
export type Subscription = (api: SubscriptionAPI, done: Function) => void
export interface SubscriptionsMapObject {
  [key: string]: Subscription
}
export interface Model {
  namespace: string
  state?: any
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer
  effects?: EffectsMapObject
  subscriptions?: SubscriptionsMapObject
}
