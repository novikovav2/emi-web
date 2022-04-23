import {Component, ElementRef, HostListener, Input} from "@angular/core";
import {Rack, RACK_DEFAULT} from "../../../../models/rack";
import {faEllipsis, faMicrochip} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-room-rack',
  templateUrl: './room-rack-item.component.html',
  styleUrls: ['../../../private.component.scss']
})
export class RoomRackItemComponent {
  @Input() rack: Rack = RACK_DEFAULT
  rackIcon = faMicrochip
  dotsIcon = faEllipsis
  menuShow = false

  constructor(private eRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if ( !this.eRef.nativeElement.contains(event.target)) {
      this.menuShow = false
    }
  }

  btnClick() {
    this.menuShow = !this.menuShow
  }

  onShow() {

  }

  onEdit() {
    console.log("EDIT")
  }

  onDelete() {

  }
}
