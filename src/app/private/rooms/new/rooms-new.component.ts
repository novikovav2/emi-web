import {Component} from "@angular/core";
import {Room} from "../../../models/room";
import {RoomsService} from "../../../services/rooms.service";
import {Router} from "@angular/router";
import {ROOMS} from "../../../consts";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-rooms-new',
  templateUrl: './rooms-new.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsNewComponent {

  constructor(private roomService: RoomsService,
              private router: Router,
              private toastr: ToastrService) {  }

  onSubmit(room: Room) {
    this.roomService.addRoom(room)
      .subscribe({
        next: () => {
          this.toastr.success("Помещение создано", room.title)
          this.router.navigate([ROOMS])
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  onReset() {
    this.router.navigate([ROOMS])
  }
}
