import {Component, OnInit} from "@angular/core";
import {Room} from "../../../models/room";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {RoomsService} from "../../../services/rooms.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {ROOMS} from "../../../consts";
import {Rack} from "../../../models/rack";

@Component({
  selector: 'app-rooms-show',
  templateUrl: './rooms-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsShowComponent implements OnInit{
  room: Room = { id: '0', title: '' }
  racks: Rack[] = []
  spinnerIcon = faSpinner
  spinnerShow = true

  constructor(private roomService: RoomsService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private breadcrumbs: BreadcrumbService) {
    this.breadcrumbs.setItems([
      {title: 'Помещения', address: '/' + ROOMS},
      {title: 'Детали', address: '/' + ROOMS}
    ])
  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id')
    if (roomId) {
      this.getRoomData(roomId)
      this.getRacksData(roomId)
    }
  }

  getRoomData(id: string) {
    this.roomService.getRoom(id)
      .subscribe({
        next: (data) => {
          this.room = data
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  getRacksData(id: string) {
    this.roomService.getRacks(id)
      .subscribe({
        next: (data) => {
          this.racks = data
          this.spinnerShow = false
          console.log(data)
        },
        error: (error) => {
          this.toastr.error(error)
          console.log(error)
        }
      })
  }

}
