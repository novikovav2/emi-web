import {Component, OnInit} from "@angular/core";
import {RoomsService} from "../../../services/rooms.service";
import {Room} from "../../../models/room";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-rooms-index',
  templateUrl: './rooms-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsIndexComponent implements OnInit {
  rooms: Room[] = []
  spinnerShow = true
  spinnerIcon = faSpinner

  constructor(private roomService: RoomsService) { }

  ngOnInit() {
    this.roomService.getRooms()
      .subscribe({
        next: (data) => {
          this.rooms = data
          this.spinnerShow = false
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

}
