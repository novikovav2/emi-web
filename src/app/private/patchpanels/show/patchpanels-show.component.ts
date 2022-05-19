import {Component, OnInit} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../models/patchpanel";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {PatchpanelsService} from "../../../services/patchpanels.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {DELETED, PATCHPANELS_URL, RACKS_URL, ROOMS_URL} from "../../../consts";
import {RacksService} from "../../../services/racks.service";
import {Room, ROOM_DEFAULT} from "../../../models/room";
import {Interface} from "../../../models/interface";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-patchpanels-show',
  templateUrl: './patchpanels-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsShowComponent implements OnInit {
  patchpanel: Patchpanel = PATCHPANEL_DEFAULT
  room: Room = ROOM_DEFAULT
  interfaces: Interface[] = []
  rooms_url = ROOMS_URL
  racks_url = RACKS_URL
  interfacesSpinnerShow = true
  interfacesSpinnerIcon = faSpinner

  constructor(private breadcrumbs: BreadcrumbService,
              private patchpanelService: PatchpanelsService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private rackService: RacksService) {
    this.breadcrumbs.setItems([
      { title: 'Патчпанели', address: PATCHPANELS_URL},
      { title: 'Детали', address: ''}
    ])
  }

  ngOnInit() {
    const patchpanelId = this.route.snapshot.paramMap.get('id')
    if (patchpanelId) {
      this.getData(patchpanelId)
      // this.getInterfacesData(patchpanelId)
    }
  }

  getData(id: string) {
    this.patchpanelService.getOne(id)
      .subscribe({
        next: (data) => {
          this.patchpanel = data
          this.getRoomData(data.rack.id)
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  getRoomData(rackId: string) {
    this.rackService.getOne(rackId)
      .subscribe({
        next: (data) => {
          this.room = data.room
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  // getInterfacesData(id: string) {
  //   this.patchpanelService.getInterfaces(id)
  //     .subscribe({
  //       next: (data) => {
  //         this.interfaces = data
  //         this.interfacesSpinnerShow = false
  //         console.log(this.interfaces)
  //       },
  //       error: (error) => {
  //         this.toastr.error(error)
  //       }
  //     })
  // }

  onDelete() {
    this.patchpanelService.delete(this.patchpanel.id)
      .subscribe({
        next: () => {
          this.toastr.success(DELETED)
          this.router.navigate([PATCHPANELS_URL])
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }
}
