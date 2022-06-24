import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CABLES_URL, CABLE_CREATED } from "src/app/consts";
import { InterfacesMatchedStartEndValidator } from "src/app/directives/interfaces-match-start-end.directive";
import { CableNewForm } from "src/app/models/cable";
import { Interface } from "src/app/models/interface";
import { DirectionType } from "src/app/models/misc";
import { Patchpanel } from "src/app/models/patchpanel";
import { Rack } from "src/app/models/rack";
import { Room } from "src/app/models/room";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { CablesService } from "src/app/services/cables.service";
import { PatchpanelsService } from "src/app/services/patchpanels.service";
import { RacksService } from "src/app/services/racks.service";
import { RoomsService } from "src/app/services/rooms.service";

@Component({
    selector: 'app-cables-new',
    templateUrl: './cables-new.component.html',
    styleUrls: ['../../private.component.scss']
})
export class CablesNewComponent  implements OnInit {
    rooms: Room[] = []
    racksStart: Rack[] = []
    racksEnd: Rack[] = []
    patchpanelsStart: Patchpanel[] = []
    patchpanelsEnd: Patchpanel[] = []
    interfacesStart: Interface[] = []
    interfacesEnd: Interface[] = []
    
    form = new FormGroup({
        roomStart: new FormControl('', [Validators.required]),
        roomEnd: new FormControl('', [Validators.required]),
        rackStart: new FormControl('', [Validators.required]),
        rackEnd: new FormControl('', [Validators.required]),
        patchpanelStart: new FormControl('', [Validators.required]),
        patchpanelEnd: new FormControl('', [Validators.required]),
        interfaceStart: new FormControl('', [Validators.required]),
        interfaceEnd: new FormControl('', [Validators.required])
    }, {validators: [InterfacesMatchedStartEndValidator]})

    constructor(private breadcrumbs: BreadcrumbService,
                private roomService: RoomsService,
                private rackService: RacksService,
                private patchpanelService: PatchpanelsService,
                private cableService: CablesService,
                private toastr: ToastrService,
                private router: Router) {
        this.breadcrumbs.setItems([
            { title: 'СКС', address: CABLES_URL },
            { title: 'Новый', address: '' }
        ])
    }

    ngOnInit(): void {
        this.roomService.getRooms()
            .subscribe({
                next: (data) => { this.rooms = data },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onSubmit() {
        const cableNew: CableNewForm = {
            startId: this.form.controls['interfaceStart'].value,
            endId: this.form.controls['interfaceEnd'].value,
        }
        this.cableService.add(cableNew)
            .subscribe({
                next: (data) => {
                    this.toastr.success(CABLE_CREATED)
                    this.router.navigate([CABLES_URL, data.id])
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onReset() {
        this.router.navigate([CABLES_URL])
    }

    onChangeRoom(directionFlag: DirectionType) {
        switch(directionFlag) {
            case 'start':
                this.racksStart = []
                this.patchpanelsStart = []
                this.interfacesStart = []
                const roomIdStart = this.form.controls['roomStart'].value
                if (roomIdStart) {
                    this.roomService.getRacks(roomIdStart)
                        .subscribe({
                            next: (data) => { this.racksStart = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                 break
            case 'end':
                this.racksEnd = []
                this.patchpanelsEnd = []
                this.interfacesEnd = []
                const roomIdEnd = this.form.controls['roomEnd'].value
                if (roomIdEnd) {
                    this.roomService.getRacks(roomIdEnd)
                        .subscribe({
                            next: (data) => { this.racksEnd = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            default:
                break
        }

    }

    onChangeRack(directionFlag: DirectionType) {
        switch(directionFlag) {
            case "start":
                this.patchpanelsStart = []
                this.interfacesStart = []
                const rackIdStart = this.form.controls['rackStart'].value
                if (rackIdStart) {
                    this.rackService.getPatchpanels(rackIdStart)
                        .subscribe({
                            next: (data) => { this.patchpanelsStart = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            case "end":
                this.patchpanelsEnd = []
                this.interfacesEnd = []
                const rackIdEnd = this.form.controls['rackEnd'].value
                if (rackIdEnd) {
                    this.rackService.getPatchpanels(rackIdEnd)
                        .subscribe({
                            next: (data) => { this.patchpanelsEnd = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            default:
                break
        }
    }

    onChangePatchpanel(directionFlag: DirectionType) {
        switch(directionFlag) {
            case "start":
                this.interfacesStart = []
                const patchpanelIdStart = this.form.controls['patchpanelStart'].value
                if (patchpanelIdStart) {
                    this.patchpanelService.getInterfaces(patchpanelIdStart, {order: 'name', direction: 'asc'})
                        .subscribe({
                            next: (data) => { this.interfacesStart = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            case "end":
                this.interfacesEnd = []
                const patchpanelIdEnd = this.form.controls['patchpanelEnd'].value
                if (patchpanelIdEnd) {
                    this.patchpanelService.getInterfaces(patchpanelIdEnd, {order: 'name', direction: 'asc'})
                        .subscribe({
                            next: (data) => { this.interfacesEnd = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            default:
                break
        }
    }
}