import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { DEVICES, DEVICES_URL, UPDATED } from "src/app/consts";
import { Device, DeviceForm, DeviceUpdated, DEVICE_DEFAULT } from "src/app/models/device";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { DevicesService } from "src/app/services/devices.service";

@Component({
    selector: 'app-devices-edit',
    templateUrl: './devices-edit.component.html',
    styleUrls: ['../../private.component.scss']
})
export class DevicesEditComponent implements OnInit {
    device: Device = DEVICE_DEFAULT
    spinnerShow = true
    spinnerIcon = faSpinner

    constructor(private breadcrumbs: BreadcrumbService,
                private deviceService: DevicesService,
                private router: Router,
                private route: ActivatedRoute,
                private toastr:ToastrService) {
        this.breadcrumbs.setItems([
            { title: 'Оборудование', address: DEVICES_URL },
            { title: 'Изменить', address: '' }
        ])
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id) {
            this.deviceService.getOne(id)
                .subscribe({
                    next: (data) => {
                        this.device = data
                        this.spinnerShow = false
                    },
                    error: (error) => {
                        this.toastr.error(error)
                    }
                })
        }
    }

    onSubmit(device: DeviceForm) {
        const deviceUpdated: DeviceUpdated = {
            name: device.name
        }
        this.deviceService.update(this.device.id, deviceUpdated)
            .subscribe({
                next: (data) => {
                    this.toastr.success(UPDATED)
                    this.router.navigate([DEVICES_URL, data.id])
                },
                error: (error) => {
                    this.toastr.error(error)
                }
            })
    }

    onReset() {
        this.router.navigate([DEVICES])
    }
}