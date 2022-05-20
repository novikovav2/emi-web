import {Component} from "@angular/core";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {DevicesService} from "../../../services/devices.service";
import {DEVICE_CREATED, DEVICES, DEVICES_URL} from "../../../consts";
import {DeviceForm} from "../../../models/device";

@Component({
  selector: 'app-devices-new',
  templateUrl: './devices-new.component.html',
  styleUrls: ['../../private.component.scss']
})
export class DevicesNewComponent {
  constructor(private breadcrumbs: BreadcrumbService,
              private toastr: ToastrService,
              private router: Router,
              private deviceService: DevicesService) {
    this.breadcrumbs.setItems([
      {title: 'Оборудование', address: DEVICES_URL},
      {title: 'Новое', address: ''}
    ])
  }

  onSubmit(device: DeviceForm) {
    this.deviceService.add(device)
      .subscribe({
        next: (data) => {
          this.toastr.success(DEVICE_CREATED, data.name)
          this.router.navigate([DEVICES_URL])
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
