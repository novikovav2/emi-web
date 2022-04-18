import {Component, OnInit} from "@angular/core";
import {Room} from "../../../models/room";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomsService} from "../../../services/rooms.service";
import {ROOMS} from "../../../consts";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-rooms-edit',
  templateUrl: './rooms-edit.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsEditComponent implements OnInit {
  room: Room = { id: '0', title: '' }
  spinnerIcon = faSpinner
  spinnerShow = true

  constructor(private route: ActivatedRoute,
              private roomService: RoomsService,
              private router: Router,
              private toastr: ToastrService) {  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.roomService.getRoom(roomId).subscribe({
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

  onSubmit(room: Room) {
    this.roomService.updateRoom(room)
      .subscribe({
        next: () => {
          this.router.navigate([ROOMS])
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  onReset() {
    this.router.navigate([ROOMS])
  }

}
