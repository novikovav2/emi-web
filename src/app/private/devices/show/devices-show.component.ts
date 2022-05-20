import {Component, OnInit} from "@angular/core";
import {Device, DEVICE_DEFAULT} from "../../../models/device";
import {Room, ROOM_DEFAULT} from "../../../models/room";
import {Interface} from "../../../models/interface";
import {DELETED, DEVICES_URL, RACKS_URL, ROOMS_URL} from "../../../consts";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {DevicesService} from "../../../services/devices.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {RacksService} from "../../../services/racks.service";

@Component({
  selector: 'app-devices-show',
  templateUrl: './devices-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class DevicesShowComponent implements OnInit {
  device: Device = DEVICE_DEFAULT
  room: Room = ROOM_DEFAULT
  interfaces: Interface[] = []
  rooms_url = ROOMS_URL
  racks_url = RACKS_URL

  constructor(private breadcrumbs: BreadcrumbService,
              private deviceService: DevicesService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private rackService: RacksService) {
    this.breadcrumbs.setItems([
      { title: 'Оборудование', address: DEVICES_URL },
      { title: 'Детали', address: '' }
    ])
  }

  ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get('id')
    if (deviceId) {
      this.getData(deviceId)
    }
  }

  getData(id: string) {
    this.deviceService.getOne(id)
      .subscribe({
        next: (data) => {
          this.device =  data
          this.getRoomData(data.rack.id)
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  getRoomData(id: string) {
    this.rackService.getOne(id)
      .subscribe({
        next: (data) => {
          this.room = data.room
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  onDelete() {
    this.deviceService.delete(this.device.id)
      .subscribe({
        next: () => {
          this.toastr.success(DELETED)
          this.router.navigate([DEVICES_URL])
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }
}
