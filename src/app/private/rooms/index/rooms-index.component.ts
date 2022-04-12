import {Component, OnInit} from "@angular/core";
import {RoomsService} from "../../../services/rooms.service";
import {Room} from "../../../models/room";

@Component({
  selector: 'app-rooms-index',
  templateUrl: './rooms-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsIndexComponent implements OnInit {
  rooms: Room[] = []

  constructor(private roomService: RoomsService) { }

  ngOnInit() {
    this.roomService.getRooms()
      .subscribe({
        next: (data) => {
          console.log("Rooms: ", data)
          this.rooms = data
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

}
