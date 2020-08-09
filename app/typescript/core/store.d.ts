import { Dispatch } from 'redux'

declare global {
  interface StoreProps {
    readonly dispatch: Dispatch
  }

  const $store: AppStore

  namespace NodeJS {
    interface Global {
      __$store: AppStore
    }
  }
}
