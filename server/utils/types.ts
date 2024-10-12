import type { Range } from '~~/packages/nimiq-validators-score/src'
import type { Activity, Score, Validator } from './drizzle'

export type Result<T> = Promise<{ data: T, error: undefined } | { data: undefined, error: string }>

export enum PayoutType {
  Restake = 'restake',
  Direct = 'direct',
  None = 'none',
}

export type ValidatorScore =
  Pick<Validator, 'id' | 'name' | 'address' | 'fee' | 'payoutType' | 'description' | 'icon' | 'isMaintainedByNimiq' | 'website'>
  & Pick<Score, 'total' | 'liveness' | 'size' | 'reliability' | 'reason'>
  & Pick<Activity, 'sizeRatio'>

export enum HealthFlag {
  MissingEpochs = 'missing-epochs',
  NoValidators = 'no-validators',
  // TOD
  O,
  // ScoreNotComputed = 'score-not-computed',
}

export interface HealthStatus {
  // TODO
  // latestScoreEpoch: number | undefined
  latestFetchedEpoch: number | undefined
  totalValidators: number
  headBlockNumber: number
  currentEpoch: number
  missingEpochs: number[]
  fetchedEpochs: number[]
  range: Range

  isSynced: boolean
  flags: HealthFlag[]
  network: string
}
