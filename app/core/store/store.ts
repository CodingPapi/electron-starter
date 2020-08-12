import * as models from '../models'

export const store = models.dvaCreateApp().getStore()

declare global {
  type AppStore = typeof store
  type StoreStateKeys = keyof StoreStates
  interface AliasStates {
    [key: string]: StoreStateKeys
  }
}
