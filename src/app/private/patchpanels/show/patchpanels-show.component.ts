import {Component, OnInit} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../models/patchpanel";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {PatchpanelsService} from "../../../services/patchpanels.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {PATCHPANELS_URL} from "../../../consts";

@Component({
  selector: 'app-patchpanels-show',
  templateUrl: './patchpanels-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsShowComponent implements OnInit {
  patchpanel: Patchpanel = PATCHPANEL_DEFAULT

  constructor(private breadcrumbs: BreadcrumbService,
              private patchpanelService: PatchpanelsService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
    this.breadcrumbs.setItems([
      { title: 'Патчпанели', address: PATCHPANELS_URL},
      { title: 'Детали', address: ''}
    ])
  }

  ngOnInit() {
    const patchpanelId = this.route.snapshot.paramMap.get('id')
    if (patchpanelId) {
      this.getData(patchpanelId)
    }
  }

  getData(id: string) {
    this.patchpanelService.getOne(id)
      .subscribe({
        next: (data) => {
          this.patchpanel = data
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  onDelete() {

  }
}
