import { material } from "./material";

export interface LogicalLink {
    id: string,
    start: {
        rack: {
            id: string,
            name: string
        },
        device: {
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
        device: {
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

export interface LogicalLinkNewForm {
    startId: string,
    endId: string
}

export const LOGICAL_LINK_DEFAULT: LogicalLink = {
    id: '',
    start: {
        rack: {
            id: '',
            name: ''
        },
        device: {
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
        device: {
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