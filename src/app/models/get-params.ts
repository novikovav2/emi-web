export interface GetParams {
  order: string,
  direction: directionOrder,
  connected: boolean
}

export type directionOrder = 'asc' | 'desc'
