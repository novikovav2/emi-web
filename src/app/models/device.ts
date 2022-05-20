import {Rack} from "./rack";

export interface Device {
  id: string,
  name: string,
  rack: Partial<Rack>
}

export interface DeviceForm {
  name: string,
  rackId: string
}

export const DEVICE_DEFAULT: Device = {
  id: '',
  name: '',
  rack: {}
}
