import {Component, OnInit} from "@angular/core";
import {Rack, RACK_DEFAULT} from "../../../models/rack";
import {RacksService} from "../../../services/racks.service";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {ToastrService} from "ngx-toastr";
import {DEVICES_URL, PATCHPANELS_URL, RACKS_URL} from "../../../consts";
import {ActivatedRoute, Router} from "@angular/router";
import {Patchpanel} from "../../../models/patchpanel";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Device} from "../../../models/device";

@Component({
  selector: 'app-rack-show',
  templateUrl: './rack-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RackShowComponent implements OnInit{
  rack: Rack = RACK_DEFAULT
  patchpanels: Patchpanel[] = []
  patchpanelSpinnerShow = true
  patchpanelSpinnerIcon = faSpinner
  patchpanels_url = PATCHPANELS_URL
  devices: Device[] = []
  deviceSpinnerShow = true
  deviceSpinnerIcon = faSpinner
  devices_url = DEVICES_URL

  constructor(private rackService: RacksService,
              private breadcrumbs: BreadcrumbService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
    this.breadcrumbs.setItems([
      {title: 'Стойки', address: RACKS_URL},
      {title: 'Детали', address: ''}
    ])
  }

  ngOnInit() {
    const rackId = this.route.snapshot.paramMap.get('id')
    if (rackId) {
      this.getRackData(rackId)
      this.getPatchpanels(rackId)
      this.getDevices(rackId)
    }
  }

  getRackData(id: string) {
    this.rackService.getOne(id)
      .subscribe({
        next: (data) => {
          this.rack = data
        },
        error: (error) => {
          this.toastr.error(error)
          console.log(error)
        }
      })
  }

  getPatchpanels(id: string) {
    this.rackService.getPatchpanels(id)
      .subscribe({
        next: (data) => {
          this.patchpanels = data
          this.patchpanelSpinnerShow = false
        },
        error: (error) => {
          this.toastr.error(error, 'Патчпанели')
        }
      })
  }

  getDevices(id: string) {
    this.rackService.getDevices(id)
      .subscribe({
        next: (data) => {
          this.devices = data
          this.deviceSpinnerShow = false
        },
        error: (error) => {
          this.toastr.error(error, 'Оборудование')
        }
      })
  }

  onDelete() {
    this.rackService.delete(this.rack.id)
      .subscribe({
        next: () => {
          this.toastr.success("Стойка удалена")
          this.router.navigate([RACKS_URL])
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }
}
