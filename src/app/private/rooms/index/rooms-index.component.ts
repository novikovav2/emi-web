import {Component, OnInit} from "@angular/core";
import {RoomsService} from "../../../services/rooms.service";
import {Room} from "../../../models/room";
import {faCirclePlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {NEW, ROOMS} from "../../../consts";
import {ToastrService} from "ngx-toastr";
import {BreadcrumbService} from "../../../services/breadcrumb.service";

@Component({
  selector: 'app-rooms-index',
  templateUrl: './rooms-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RoomsIndexComponent implements OnInit {
  rooms: Room[] = []
  spinnerShow = true
  spinnerIcon = faSpinner
  addIcon = faCirclePlus

  constructor(private roomService: RoomsService,
              private router: Router,
              private toaster: ToastrService,
              private breadcrums: BreadcrumbService) {
    this.breadcrums.setItems([
      {title: 'Помещения', address: '/' + ROOMS}
    ])
  }

  ngOnInit() {
    this.getData()
  }

  newRoom() {
    this.router.navigate([ROOMS, NEW])
  }

  onDelete() {
    this.toaster.success("Помещение удалено")
    this.spinnerShow = true
    this.getData()
  }

  getData() {
    this.roomService.getRooms()
      .subscribe({
        next: (data) => {
          this.rooms = data
          this.spinnerShow = false
        },
        error: (error) => {
          this.toaster.error(error, 'Попробуйте позже')
        }
      })
  }

}
