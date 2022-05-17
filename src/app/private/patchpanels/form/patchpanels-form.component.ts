import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT, PatchpanelForm} from "../../../models/patchpanel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RacksService} from "../../../services/racks.service";
import {Room} from "../../../models/room";
import {Rack} from "../../../models/rack";
import {RoomsService} from "../../../services/rooms.service";

@Component({
  selector: 'app-patchpanels-form',
  templateUrl: './patchpanels-form.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsFormComponent implements OnInit {
  @Input() patchpanel: Patchpanel = PATCHPANEL_DEFAULT
  @Output() submitEvent = new EventEmitter<PatchpanelForm>()
  @Output() resetEvent = new EventEmitter()
  rooms: Room[] = []
  racks: Rack[] = []
  types = [
    {text: 'Медная', value: 'COPPER'},
    {text: 'Оптическая', value: 'OPTIC'}
  ]
  roomDisabled = false
  rackDisabled = true
  typeDisabled = false

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    rack_id: new FormControl('', [Validators.required]),
    room_id: new FormControl('', [Validators.required])
  })

  constructor(private toastr: ToastrService,
              private rackService: RacksService,
              private roomService: RoomsService) { }

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
    const patchpanel: PatchpanelForm = {
      name: this.form.controls['name'].value,
      rackId: this.form.controls['rack_id'].value,
      type: this.form.controls['type'].value
    }
    this.submitEvent.emit(patchpanel)
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
