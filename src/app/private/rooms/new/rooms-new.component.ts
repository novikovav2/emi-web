import {Component} from "@angular/core";
import {Room} from "../../../models/room";
import {RoomsService} from "../../../services/rooms.service";
import {Router} from "@angular/router";
import {ROOMS} from "../../../consts";

@Component({
  selector: 'app-rooms-new',
  templateUrl: './rooms-new.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsNewComponent {

  constructor(private roomService: RoomsService,
              private router: Router) {  }

  onSubmit(room: Room) {
    this.roomService.addRoom(room)
      .subscribe({
        next: () => {
          this.router.navigate([ROOMS])
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  onReset() {
    console.log("RESET")
  }
}
