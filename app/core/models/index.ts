import UserMgmt, { defaultState as UserState } from 'src/models/userMgmt'
import Beacon, { defaultState as BeaconState } from 'src/models/beacon'
import * as dva from './dva'
export * from './dva'

export const models: Array<dva.Model> = [UserMgmt, Beacon]

export const initialState = {
  userMgmt: UserState,
  beacon: BeaconState,
}

export type GlobalState = Readonly<typeof initialState>
