import {Component, Input, HostListener, ElementRef} from "@angular/core";
import {faDiceSix, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {Room} from "../../../../models/room";
import {ROOMS} from "../../../../consts";

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss', '../../../private.component.scss']
})
export class RoomItemComponent {
  dotsIcon = faEllipsis
  roomIcon = faDiceSix
  @Input() room: Room = { id: 0, title: ''}
  menuShow: boolean = false
  roomsUrl = ROOMS

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuShow = false
    }
  }

  btnClick() {
    this.menuShow = !this.menuShow
  }

  onEdit() {
    console.log("EDIT")
  }

  onDelete() {
    console.log("DELETE")
  }
}
