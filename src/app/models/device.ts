import {Rack, RACK_DEFAULT} from "./rack";

export interface Device {
  id: string,
  name: string,
  rack: Rack
}

export interface DeviceForm {
  name: string,
  rackId: string
}

export interface DeviceUpdated {
  name: string
}

export const DEVICE_DEFAULT: Device = {
  id: '',
  name: '',
  rack: RACK_DEFAULT
}
