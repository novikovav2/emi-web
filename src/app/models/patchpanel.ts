import {material} from "./material";
import {Rack} from "./rack";

export interface Patchpanel {
  id: string,
  name: string,
  type: material,
  rack: Partial<Rack>
}

export const PATCHPANEL_DEFAULT: Patchpanel = {
  id: '',
  name: '',
  type: 'COPPER',
  rack: {
    id: ''
  }
}