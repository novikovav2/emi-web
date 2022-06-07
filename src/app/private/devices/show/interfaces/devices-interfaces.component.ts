import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { faCaretDown, faCaretUp, faSpinner, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { INTERFACE_CREATED, INTERFACE_DELETED } from "src/app/consts";
import { Device, DEVICE_DEFAULT } from "src/app/models/device";
import { directionOrder, GetParams } from "src/app/models/get-params";
import { Interface } from "src/app/models/interface";
import { DevicesService } from "src/app/services/devices.service";

@Component({
    selector: 'app-devices-interfaces',
    templateUrl: './devices-interfaces.component.html',
    styleUrls: ['../../../private.component.scss']
})
export class DevicesInterfacesComponent implements OnChanges {
    @Input() device: Device = DEVICE_DEFAULT
    interfaces: Interface[] = []
    spinnerShow = true
    spinnerIcon = faSpinner
    trashIcon = faTrashCan
    orderBy = 'name'
    orderDirection: directionOrder = 'asc'
    sortAscIcon = faCaretDown
    sortDescIcon = faCaretUp

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]) // TODO: add validators based on interface type
    })

    constructor(private deviceService: DevicesService,
                private toastr: ToastrService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const id = changes['device'].currentValue.id
        if (id) {
            this.getData(id)
        }
    }

    getData(id: string) {
        const params: Partial<GetParams> = {
            order: this.orderBy,
            direction: this.orderDirection
        }
        this.deviceService.getInterfaces(id, params)
            .subscribe({
                next: (data) => {
                    this.interfaces = data
                    this.spinnerShow = false
                },
                error: (error) => {
                    console.log(error);
                    this.toastr.error(error)
                }
            })
    }

    onSubmit() {
        const int: Partial<Interface> = {
            name: this.form.controls['name'].value,
            type: this.form.controls['type'].value
        }
        this.deviceService.addInterface(this.device.id, int)
            .subscribe({
                next: (data) => {
                    this.toastr.success(INTERFACE_CREATED, data.name)
                    this.form.reset()
                    this.spinnerShow = true
                    this.getData(this.device.id)
                },
                error: (error) => {
                    this.toastr.error(error)
                }
            })
    }

    onDelete(intId: string) {
        this.deviceService.deleteInterface(this.device.id, intId)
            .subscribe({
                next: () => {
                    this.toastr.success(INTERFACE_DELETED)
                    this.spinnerShow = true
                    this.getData(this.device.id)
                },
                error: (error) => {
                    this.toastr.error(error)
                }
            })
    }

    changeOrder(order: string) {
        this.spinnerShow = true
        if (this.orderBy === order) {
            this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc'
        } else {
            this.orderBy = order
            this.orderDirection = 'asc'
        }
        this.getData(this.device.id)
    }
}