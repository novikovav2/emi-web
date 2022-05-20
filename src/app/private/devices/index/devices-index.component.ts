import {Component, OnInit} from "@angular/core";
import {Device} from "../../../models/device";
import {faCirclePlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DEVICES_URL, NEW, RACKS_URL} from "../../../consts";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {ToastrService} from "ngx-toastr";
import {DevicesService} from "../../../services/devices.service";

@Component({
  selector: 'app-devices-index',
  templateUrl: './devices-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class DevicesIndexComponent implements OnInit {
  devices: Device[] = []
  addIcon = faCirclePlus
  spinnerShow = true
  spinnerIcon = faSpinner
  new_url = NEW
  racks_url = RACKS_URL

  constructor(private breadcrumbs: BreadcrumbService,
              private toastr: ToastrService,
              private deviceService: DevicesService) {
    this.breadcrumbs.setItems([
      { title: 'Оборудование', address: DEVICES_URL }
    ])
  }

  ngOnInit() {
    this.deviceService.getAll()
      .subscribe({
        next: (data) => {
          this.devices = data
          this.spinnerShow = false
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }
}
