import {Component, OnInit} from "@angular/core";
import {Room} from "../../../models/room";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomsService} from "../../../services/rooms.service";
import {ROOMS} from "../../../consts";

@Component({
  selector: 'app-rooms-edit',
  templateUrl: './rooms-edit.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsEditComponent implements OnInit {
  room: Room = { id: 0, title: '' }

  constructor(private route: ActivatedRoute,
              private roomService: RoomsService,
              private router: Router) {  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.roomService.getRoom(roomId).subscribe({
        next: (data) => {
          this.room = data
        }
      })
    }
  }

  onSubmit(room: Room) {
    this.roomService.updateRoom(room)
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
    this.router.navigate([ROOMS])
  }

}
