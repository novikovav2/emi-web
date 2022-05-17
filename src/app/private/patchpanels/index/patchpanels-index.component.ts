import {Component, OnInit} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../models/patchpanel";
import {faCirclePlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {PatchpanelsService} from "../../../services/patchpanels.service";
import {ToastrService} from "ngx-toastr";
import {NEW, PATCHPANELS_URL, RACKS_URL} from "../../../consts";

@Component({
  selector: 'app-patchpanels-index',
  templateUrl: './patchpanels-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsIndexComponent implements OnInit{
  patchpanels: Patchpanel[] = [PATCHPANEL_DEFAULT]
  addIcon = faCirclePlus
  spinnerShow = true
  spinnerIcon = faSpinner
  new_url = NEW
  racks_url = RACKS_URL

  constructor(private breadcrumbs: BreadcrumbService,
              private patchpanelService: PatchpanelsService,
              private toastr: ToastrService) {
    this.breadcrumbs.setItems([
      { title: 'Патчпанели', address: PATCHPANELS_URL }
    ])
  }

  ngOnInit() {
    this.patchpanelService.getAll()
      .subscribe({
        next: (data) => {
          this.patchpanels = data
          this.spinnerShow = false
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }
}
