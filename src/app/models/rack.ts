import {Room} from "./room";

export interface Rack {
  id: string,
  name: string,
  room: Room
}

export interface RackNew {
  name: string,
  roomId: string
}

export const RACK_DEFAULT: Rack = {
  id: '0',
  name: '',
  room: {
    id: '',
    title: ''
  }
}
