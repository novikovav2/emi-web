import { material } from "./material";


// export interface Patchcord {
//     id: string,
//     type: material,
//     start: Partial<Interface>,
//     end: Partial<Interface>
// }

// export const PATCHCORD_DEFAULT: Patchcord = {
//     id: '',
//     type: 'COPPER',
//     start: {},
//     end: {}
// }

export interface Patchcord {
    id: string,
    type: material,
    start: {
        rack: {
            id: string,
            name: string
        },
        owner: {
            id:string,
            name: string,
            type: string
        },
        interface: {
            id: string,
            name: string,
            type: string
        }
    },
    end: {
        rack: {
            id: string,
            name: string
        },
        owner: {
            id:string,
            name: string,
            type: string
        },
        interface: {
            id: string,
            name: string,
            type: string
        }
    }
}

export interface PatchcordNewForm {
    startId: string,
    endId: string
}