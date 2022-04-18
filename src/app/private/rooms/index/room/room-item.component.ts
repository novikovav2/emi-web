import {Component, Input, HostListener, ElementRef, Output, EventEmitter} from "@angular/core";
import {faDiceSix, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {Room} from "../../../../models/room";
import {EDIT, ROOMS} from "../../../../consts";
import {Router} from "@angular/router";
import {RoomsService} from "../../../../services/rooms.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss', '../../../private.component.scss']
})
export class RoomItemComponent {
  dotsIcon = faEllipsis
  roomIcon = faDiceSix
  @Input() room: Room = { id: '0', title: ''}
  menuShow: boolean = false
  @Output() deleteRoom = new EventEmitter()

  constructor(private eRef: ElementRef,
              private router: Router,
              private roomService: RoomsService,
              private toastr: ToastrService) { }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuShow = false
    }
  }

  btnClick() {
    this.menuShow = !this.menuShow
  }

  onShow() {
    this.router.navigate([ROOMS, this.room.id])
  }

  onEdit() {
    this.router.navigate([ROOMS, EDIT, this.room.id])
  }

  onDelete() {
    this.roomService.deleteRoom(this.room.id)
      .subscribe({
        next: () => {
          this.deleteRoom.emit()
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }
}
