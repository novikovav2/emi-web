import {material} from "./material";
import {Rack} from "./rack";
import {ROOM_DEFAULT} from "./room";

export interface Patchpanel {
  id: string,
  name: string,
  type: material,
  rack: Rack
}

export interface PatchpanelForm {
  name: string,
  rackId: string,
  type: material
}

export interface PatchpanelUpdated {
  name: string
}

export const PATCHPANEL_DEFAULT: Patchpanel = {
  id: '',
  name: '',
  type: 'COPPER',
  rack: {
    id: '',
    name: '',
    room: ROOM_DEFAULT
  }
}
