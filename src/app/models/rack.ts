import {Room} from "./room";

export interface Rack {
  id: string,
  name: string,
  room: Room
}

export const RACK_DEFAULT: Rack = {
  id: '0',
  name: '',
  room: {
    id: '',
    title: ''
  }
}
