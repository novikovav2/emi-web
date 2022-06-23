import { Component, OnInit } from "@angular/core";
import { faCirclePlus, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { CABLES_URL, NEW, PATCHPANELS_URL, RACKS_URL } from "src/app/consts";
import { Cable } from "src/app/models/cable";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { CablesService } from "src/app/services/cables.service";

@Component({
    selector: 'app-cables-index',
    templateUrl: './cables-index.component.html',
    styleUrls: ['../../private.component.scss']
})
export class CablesIndexComponent implements OnInit{
    cables: Cable[] = []
    addIcon = faCirclePlus
    spinnerShow = true
    spinnerIcon = faSpinner
    viewIcon = faEye
    new_url = NEW
    racks_url = RACKS_URL
    patchpanels_url = PATCHPANELS_URL

    constructor(private breadcrumbs: BreadcrumbService,
                private toastr: ToastrService,
                private cableService: CablesService) {
        this.breadcrumbs.setItems([
            { title: 'СКС', address: CABLES_URL }
        ])
    }

    ngOnInit(): void {
        this.cableService.getAll()
            .subscribe({
                next: (data) => {
                    this.cables = data
                    this.spinnerShow = false
                },
                error: (error) => { this.toastr.error(error) }
            })
    }
}