import {Component, OnInit} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT, PatchpanelForm, PatchpanelUpdated} from "../../../models/patchpanel";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {PatchpanelsService} from "../../../services/patchpanels.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PATCHPANELS, PATCHPANELS_URL, UPDATED} from "../../../consts";

@Component({
  selector: 'app-pathcpanels-edit',
  templateUrl: './patchpanels-edit.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsEditComponent implements OnInit {
  patchpanel: Patchpanel = PATCHPANEL_DEFAULT
  spinnerShow = true
  spinnerIcon = faSpinner

  constructor(private breadcrumbs: BreadcrumbService,
              private patchpanelService: PatchpanelsService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    this.breadcrumbs.setItems([
      { title: 'Патчпанели', address: PATCHPANELS_URL },
      { title: 'Изменить', address: '' }
    ])
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.patchpanelService.getOne(id)
        .subscribe({
          next: (data) => {
            this.patchpanel = data
            this.spinnerShow = false
          },
          error: (error) => {
            this.toastr.error(error)
          }
        })
    }
  }

  onSubmit(patchpanel: PatchpanelForm) {
    const patchpanelUpdated: PatchpanelUpdated = {
      name: patchpanel.name
    }
    this.patchpanelService.update(this.patchpanel.id, patchpanelUpdated)
      .subscribe({
        next: (data) => {
          this.toastr.success(UPDATED)
          this.router.navigate([PATCHPANELS_URL, data.id])
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  onReset() {
    this.router.navigate([PATCHPANELS])
  }

}
