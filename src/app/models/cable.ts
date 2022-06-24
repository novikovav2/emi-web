import { material } from "./material";

export interface Cable {
    id: string,
    type: material,
    start: {
        rack: {
            id: string,
            name: string
        },
        patchpanel: {
            id:string,
            name: string
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
        patchpanel: {
            id:string,
            name: string
        },
        interface: {
            id: string,
            name: string,
            type: string
        }
    }
}

export interface CableNewForm {
    startId: string,
    endId: string
}

export const CABLE_DEFAULT: Cable = {
    id: '',
    type: 'COPPER',
    start: {
        rack: {
            id: '',
            name: ''
        },
        patchpanel: {
            id: '',
            name: ''
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
        patchpanel: {
            id: '',
            name: ''
        },
        interface: {
            id: '',
            name: '',
            type: ''
        }
    }
}