import {Component, ElementRef, HostListener, Input} from "@angular/core";
import {Rack, RACK_DEFAULT} from "../../../../models/rack";
import {faEllipsis, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {RACKS} from "../../../../consts";

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

  constructor(private eRef: ElementRef,
              private router: Router) {
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
    this.router.navigate([RACKS, this.rack.id])
  }

  onEdit() {
    console.log("EDIT")
  }

  onDelete() {

  }
}
