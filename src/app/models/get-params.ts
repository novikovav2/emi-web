import { SortDirection } from "@angular/material/sort"

export interface GetParams {
  order: string,
  // direction: directionOrder,
  direction: SortDirection
  connected: boolean,
  filter: string
}

export type directionOrder = 'asc' | 'desc'
