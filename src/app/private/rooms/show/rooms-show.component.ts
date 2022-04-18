import {Component, OnInit} from "@angular/core";
import {Room} from "../../../models/room";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {RoomsService} from "../../../services/rooms.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-rooms-show',
  templateUrl: './rooms-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsShowComponent implements OnInit{
  room: Room = { id: '0', title: '' }
  spinnerIcon = faSpinner
  spinnerShow = true

  constructor(private roomService: RoomsService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id')
    if (roomId) {
      this.roomService.getRoom(roomId)
        .subscribe({
          next: (data) => {
            this.room = data
            this.spinnerShow = false
          },
          error: (error) => {
            this.toastr.error(error)
          }
        })
    }
  }

}
