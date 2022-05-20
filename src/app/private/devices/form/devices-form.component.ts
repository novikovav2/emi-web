import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Device, DEVICE_DEFAULT, DeviceForm} from "../../../models/device";
import {Room} from "../../../models/room";
import {Rack} from "../../../models/rack";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DevicesService} from "../../../services/devices.service";
import {RoomsService} from "../../../services/rooms.service";

@Component({
  selector: 'app-devices-form',
  templateUrl: './devices-form.component.html',
  styleUrls: ['../../private.component.scss']
})
export class DevicesFormComponent implements OnInit {
  @Input() device: Device = DEVICE_DEFAULT
  @Output() submitEvent = new EventEmitter<DeviceForm>()
  @Output() resetEvent = new EventEmitter()
  @Input() isDisabled: boolean = false
  rooms: Room[] = []
  racks: Rack[] = []
  rackDisabled = true

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    room_id: new FormControl(''),
    rack_id: new FormControl('', [Validators.required])
  })

  constructor(private toastr: ToastrService,
              private deviceService: DevicesService,
              private roomService: RoomsService) {
  }

  ngOnInit() {
    this.roomService.getRooms()
      .subscribe({
        next: (data) => {
          this.rooms = data
        },
        error: (error) => {
          this.toastr.error(error, 'Список помещений')
        }
      })
  }

  onSubmit() {
    const device: DeviceForm = {
      name: this.form.controls['name'].value,
      rackId: this.form.controls['rack_id'].value
    }
    this.submitEvent.emit(device)
  }

  onReset() {
    this.resetEvent.emit()
  }

  onChangeRoom() {
    const roomId = this.form.controls['room_id'].value
    this.rackDisabled = true
    this.getRacksData(roomId)
  }

  getRacksData(roomId: string) {
    this.roomService.getRacks(roomId)
      .subscribe({
        next: (data) => {
          this.racks = data
          this.rackDisabled = false
        },
        error: (error) => {
          this.toastr.error(error, 'Список стоек')
        }
      })
  }
}
