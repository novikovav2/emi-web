import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PATCHCORDS_URL, PATCHCORD_CREATED } from "src/app/consts";
import { GetParams } from "src/app/models/get-params";
import { Interface } from "src/app/models/interface";
import { PatchcordNewForm } from "src/app/models/patchcords";
import { Rack } from "src/app/models/rack";
import { Room } from "src/app/models/room";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { DevicesService } from "src/app/services/devices.service";
import { PatchcordsService } from "src/app/services/patchcords.service";
import { PatchpanelsService } from "src/app/services/patchpanels.service";
import { RacksService } from "src/app/services/racks.service";
import { RoomsService } from "src/app/services/rooms.service";

type OwnerType = 'Patchpanel' | 'Device'
type DirectionType = 'start' | 'end'

interface Owner {
    id: string,
    name: string,
    type: OwnerType
}

@Component({
    selector: 'app-patchcords-new',
    templateUrl: './patchcords-new.component.html',
    styleUrls: ['../../private.component.scss']
})
export class PatchcordsNewComponent implements OnInit {
    rooms: Room[] = []
    racks: Rack[] = []
    roomsEnd: Room[] = []
    racksEnd: Rack[] = []
    ownersStart: Owner[] = []
    ownersEnd: Owner[] = []
    interfacesStart: Interface[] = []
    interfacesEnd: Interface[] = []

    form = new FormGroup({
        room: new FormControl('', [Validators.required]),
        rackStart: new FormControl('', [Validators.required]),
        ownerStart: new FormControl('', [Validators.required]),
        interfaceStart: new FormControl('', [Validators.required]),
        rackEnd: new FormControl('', [Validators.required]),
        ownerEnd: new FormControl('', [Validators.required]),
        interfaceEnd: new FormControl('', [Validators.required]),
    })

    constructor(private breadcrumbs: BreadcrumbService,
                private roomService: RoomsService,
                private rackService: RacksService,
                private deviceService: DevicesService,
                private patchpanelService: PatchpanelsService,
                private patchcordService: PatchcordsService,
                private toastr: ToastrService,
                private router: Router ) {
        this.breadcrumbs.setItems([
            { title: 'Патчкорды', address: PATCHCORDS_URL },
            { title: 'Новый', address: '' }
        ])
    }

    ngOnInit(): void {
        this.roomService.getRooms()
            .subscribe({
                next: (data) => {
                    this.rooms = data
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onSubmit() {
        const patchcordNew: PatchcordNewForm = {
            startId: this.form.controls['interfaceStart'].value,
            endId: this.form.controls['interfaceEnd'].value
        }
       
        this.patchcordService.add(patchcordNew)
            .subscribe({
                next: (data) => {
                    this.toastr.success(PATCHCORD_CREATED)
                    this.router.navigate([PATCHCORDS_URL])
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onReset() {
        this.router.navigate([PATCHCORDS_URL])
    }

    onChangeRoom() {
        this.racks = []
        this.ownersStart = []
        this.ownersEnd = []
        this.interfacesStart = []
        this.interfacesEnd = []
        const roomId = this.form.controls['room'].value
        if (roomId) {
            this.roomService.getRacks(roomId)
                .subscribe({
                    next: (data) => {
                        this.racks = data
                    },
                    error: (error) => { this.toastr.error(error) }
                })
        }
        
    }

    onChangeRack(directionFlag: string) {
        const rackId = directionFlag === 'start' ? this.form.controls['rackStart'].value : this.form.controls['rackEnd'].value
        this.rackService.getPatchpanels(rackId)
            .subscribe({
                next: (data) => {
                    if (directionFlag === 'start') {
                        this.ownersStart = []
                        data.forEach(item => this.ownersStart.push({
                            id: item.id,
                            name: item.name,
                            type: 'Patchpanel'
                        }))
                    } else {
                        this.ownersEnd = []
                        data.forEach(item => this.ownersEnd.push({
                            id: item.id,
                            name: item.name,
                            type: 'Patchpanel'
                        }))
                    }
                }
            })
        this.rackService.getDevices(rackId)
            .subscribe({
                next: (data) => {
                    if (directionFlag === 'start') {
                        this.ownersStart = []
                        data.forEach(item => this.ownersStart.push({
                            id: item.id,
                            name: item.name,
                            type: 'Device'
                        }))
                    } else {
                        this.ownersEnd = []
                        data.forEach(item => this.ownersEnd.push({
                            id: item.id,
                            name: item.name,
                            type: 'Device'
                        }))
                    }
                }
            })
    }

    onChangeOwner(directionFlag: DirectionType) {
       
        let ownerId: string = ''
        let owner: Owner | undefined = {id: '', name: '', type: 'Device'}

        if (directionFlag === 'start') {
            ownerId = this.form.controls['ownerStart'].value
            owner = this.ownersStart.find(item => item.id === ownerId)
        } else {
            ownerId = this.form.controls['ownerEnd'].value
            owner = this.ownersEnd.find(item => item.id === ownerId)
        }
        
        const params: Partial<GetParams> = {
            order: 'name',
            direction: 'asc',
            connected: false
        }

        if (owner && owner.type === 'Device') {   
            this.deviceService.getInterfaces(ownerId, params)
                .subscribe({
                    next: (data) => {
                        if (directionFlag === 'start') {
                            this.interfacesStart = data
                        } else {
                            this.interfacesEnd = data
                        }
                    },
                    error: (error) => { this.toastr.error(error) }
                })
        } else {
            this.patchpanelService.getInterfaces(ownerId, params)
                .subscribe({
                    next: (data) => {
                        if (directionFlag === 'start') {
                            this.interfacesStart = data
                        } else {
                            this.interfacesEnd = data
                        }
                    },
                    error: (error) => { this.toastr.error(error) }
                })
        }
        
               
    }
}