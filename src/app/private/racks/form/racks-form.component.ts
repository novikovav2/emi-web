import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {Rack, RACK_DEFAULT, RackNew} from "../../../models/rack";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomsService} from "../../../services/rooms.service";
import {Room, ROOM_DEFAULT} from "../../../models/room";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-racks-form',
  templateUrl: './racks-form.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RacksFormComponent implements OnInit, OnChanges {
  @Input() rack: Rack = RACK_DEFAULT
  @Output() submitEvent = new EventEmitter<RackNew>()
  @Output() resetEvent = new EventEmitter()
  rooms: Room[] = [ROOM_DEFAULT]
  @Input() isDisabled: boolean = false

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    room_id: new FormControl('', [Validators.required])
  })

  constructor(private roomService: RoomsService,
              private toastr: ToastrService) {  }

  ngOnInit() {
    this.roomService.getRooms()
      .subscribe({
        next: (data) => {
          this.rooms = data
        },
        error: (error) => {
          console.log(error)
          this.toastr.error(error)
        }
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.controls['name'].setValue(changes['rack'].currentValue.name)
    this.form.controls['room_id'].setValue(changes['rack'].currentValue.room.id)
  }

  onSubmit() {
    const rack: RackNew = {
      name: this.form.controls['name'].value,
      roomId: this.form.controls['room_id'].value
    }
    this.submitEvent.emit(rack)
  }

  onReset() {
    this.resetEvent.emit()
  }
}
