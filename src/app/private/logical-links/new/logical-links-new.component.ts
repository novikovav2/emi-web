import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LOGICAL_LINKS_URL, LOGICAL_LINK_CREATED } from "src/app/consts";
import { InterfacesMatchedStartEndValidator } from "src/app/directives/interfaces-match-start-end.directive";
import { Device } from "src/app/models/device";
import { Interface } from "src/app/models/interface";
import { LogicalLinkNewForm } from "src/app/models/logical-link";
import { DirectionType } from "src/app/models/misc";
import { Rack } from "src/app/models/rack";
import { Room } from "src/app/models/room";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { DevicesService } from "src/app/services/devices.service";
import { LogicalLinksService } from "src/app/services/logical-links.service";
import { RacksService } from "src/app/services/racks.service";
import { RoomsService } from "src/app/services/rooms.service";

@Component({
    selector: 'app-logical-links-new',
    templateUrl: './logical-links-new.component.html',
    styleUrls: ['../../private.component.scss']
})
export class LogicalLinksNewComponent implements OnInit{
    rooms: Room[] = []
    racksStart: Rack[] = []
    racksEnd: Rack[] = []
    devicesStart: Device[] = []
    devicesEnd: Device[] = []
    interfacesStart: Interface[] = []
    interfacesEnd: Interface[] = []

    form = new FormGroup({
        roomStart: new FormControl('', [Validators.required]),
        roomEnd: new FormControl('', [Validators.required]),
        rackStart: new FormControl('', [Validators.required]),
        rackEnd: new FormControl('', [Validators.required]),
        deviceStart: new FormControl('', [Validators.required]),
        deviceEnd: new FormControl('', [Validators.required]),
        interfaceStart: new FormControl('', [Validators.required]),
        interfaceEnd: new FormControl('', [Validators.required])
    }, {validators: [InterfacesMatchedStartEndValidator]})

    constructor(private breadcrumbs: BreadcrumbService,
                private roomService: RoomsService,
                private rackService: RacksService,
                private deviceService: DevicesService,
                private logicalLinkService: LogicalLinksService,
                private toastr: ToastrService,
                private router: Router) {
        this.breadcrumbs.setItems([
            { title: 'Логические связи', address: LOGICAL_LINKS_URL },
            { title: 'Новая', address: '' }
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
        const logicalLinkNew: LogicalLinkNewForm = {
            startId: this.form.controls['interfaceStart'].value,
            endId: this.form.controls['interfaceEnd'].value,
        }
        this.logicalLinkService.add(logicalLinkNew)
            .subscribe({
                next: (data) => {
                    this.toastr.success(LOGICAL_LINK_CREATED)
                    this.router.navigate([LOGICAL_LINKS_URL])
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onReset() {
        this.router.navigate([LOGICAL_LINKS_URL])
    }

    onChangeRoom(directionFlag: DirectionType) {
        switch(directionFlag) {
            case 'start':
                this.racksStart = []
                this.devicesStart = []
                this.interfacesStart = []
                this.form.controls['rackStart'].reset()
                this.form.controls['deviceStart'].reset()
                this.form.controls['interfaceStart'].reset()
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
                this.devicesEnd = []
                this.interfacesEnd = []
                this.form.controls['rackEnd'].reset()
                this.form.controls['deviceEnd'].reset()
                this.form.controls['interfaceEnd'].reset()
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
                this.devicesStart = []
                this.interfacesStart = []
                this.form.controls['deviceStart'].reset()
                this.form.controls['interfaceStart'].reset()
                const rackIdStart = this.form.controls['rackStart'].value
                if (rackIdStart) {
                    this.rackService.getDevices(rackIdStart)
                        .subscribe({
                            next: (data) => { this.devicesStart = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            case "end":
                this.devicesEnd = []
                this.interfacesEnd = []
                this.form.controls['deviceEnd'].reset()
                this.form.controls['interfaceEnd'].reset()
                const rackIdEnd = this.form.controls['rackEnd'].value
                if (rackIdEnd) {
                    this.rackService.getDevices(rackIdEnd)
                        .subscribe({
                            next: (data) => { this.devicesEnd = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            default:
                break
        }
    }

    onChangeDevice(directionFlag: DirectionType) {
        switch(directionFlag) {
            case "start":
                this.interfacesStart = []
                this.form.controls['interfaceStart'].reset()
                const deviceIdStart = this.form.controls['deviceStart'].value
                if (deviceIdStart) {
                    this.deviceService.getInterfaces(deviceIdStart, {order: 'name', direction: 'asc'})
                        .subscribe({
                            next: (data) => { this.interfacesStart = data },
                            error: (error) => { this.toastr.error(error) }
                        })
                }
                break
            case "end":
                this.interfacesEnd = []
                this.form.controls['interfaceEnd'].reset()
                const deviceIdEnd = this.form.controls['deviceEnd'].value
                if (deviceIdEnd) {
                    this.deviceService.getInterfaces(deviceIdEnd, {order: 'name', direction: 'asc'})
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