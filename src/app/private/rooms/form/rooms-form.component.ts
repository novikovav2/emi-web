import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Room} from "../../../models/room";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rooms-form',
  templateUrl: './rooms-form.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsFormComponent {
  @Input() room: Room = { id: 0, title: ''}
  @Output() submitEvent = new EventEmitter<Room>()
  @Output() resetEvent = new EventEmitter()

  form = new FormGroup({
    title: new FormControl(this.room.title, [
      Validators.required
    ])
  })

  onSubmit() {
    const room: Room = {
      id: this.room.id,
      title: this.form.controls['title'].value
    }
    this.submitEvent.emit(room)
  }

  onReset() {
    this.resetEvent.emit()
  }
}
