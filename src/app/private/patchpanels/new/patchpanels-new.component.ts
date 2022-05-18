import {Component} from "@angular/core";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {PatchpanelsService} from "../../../services/patchpanels.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {PATCHPANEL_CREATED, PATCHPANELS, PATCHPANELS_URL} from "../../../consts";
import {PatchpanelForm} from "../../../models/patchpanel";

@Component({
  selector: 'app-patchpanels-new',
  templateUrl: './patchpanels-new.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsNewComponent {

  constructor(private breadcrumbs: BreadcrumbService,
              private patchpanelService: PatchpanelsService,
              private toastr: ToastrService,
              private router: Router) {
    this.breadcrumbs.setItems([
      {title: 'Патчпанели', address: PATCHPANELS_URL},
      {title: 'Новая', address: PATCHPANELS_URL}
    ])
  }

  onSubmit(patchpanel: PatchpanelForm) {
    this.patchpanelService.add(patchpanel)
      .subscribe({
        next: (data) => {
          this.toastr.success(PATCHPANEL_CREATED, data.name)
          this.router.navigate([PATCHPANELS_URL])
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
