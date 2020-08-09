import AddDemo, { defaultState as DemoState } from './addDemo'
import * as dva from './dva'
export * from './dva'

export const models: Array<dva.Model> = [AddDemo /*, Beacon*/]

export const initialState = {
  addDemo: DemoState,
}

declare global {
  type StoreStates = Readonly<typeof initialState>
}
