import {Component} from "@angular/core";
import {Room} from "../../../models/room";
import {RoomsService} from "../../../services/rooms.service";
import {Router} from "@angular/router";
import {ROOMS} from "../../../consts";
import {ToastrService} from "ngx-toastr";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-rooms-new',
  templateUrl: './rooms-new.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsNewComponent {
  spinnerIcon = faSpinner
  spinnerShow = false

  constructor(private roomService: RoomsService,
              private router: Router,
              private toastr: ToastrService) {  }

  onSubmit(room: Room) {
    this.spinnerShow = true
    this.roomService.addRoom(room)
      .subscribe({
        next: () => {
          this.toastr.success("Помещение создано", room.title)
          this.router.navigate([ROOMS])
        },
        error: (error) => {
          this.toastr.error(error, 'Попробуйте позже')
          this.spinnerShow = false
        }
      })
  }

  onReset() {
    this.router.navigate([ROOMS])
  }
}
