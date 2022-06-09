import { material } from "./material";

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

export const PATCHCORD_DEFAULT: Patchcord = {
    id: '',
    type: 'COPPER',
    start: {
        rack: {
            id: '',
            name: ''
        },
        owner: {
            id: '',
            name: '',
            type: ''
        },
        interface: {
            id: '',
            name: '',
            type: ''
        }
    },
    end: {
        rack: {
            id: '',
            name: ''
        },
        owner: {
            id: '',
            name: '',
            type: ''
        },
        interface: {
            id: '',
            name: '',
            type: ''
        }
    }
}