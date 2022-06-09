import { Component, OnInit } from "@angular/core";
import { faCirclePlus, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { DEVICES_URL, NEW, PATCHCORDS_URL, PATCHPANELS_URL, RACKS_URL } from "src/app/consts";
import { Patchcord } from "src/app/models/patchcords";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { PatchcordsService } from "src/app/services/patchcords.service";

@Component({
    selector: 'app-patchcords-index',
    templateUrl: './patchcords-index.component.html',
    styleUrls: ['../../private.component.scss']
})
export class PatchcordsIndexComponent implements OnInit {
    patchcords: Patchcord[] = []
    addIcon = faCirclePlus
    spinnerShow = true
    spinnerIcon = faSpinner
    viewIcon = faEye
    new_url = NEW
    racks_url = RACKS_URL
    patchpanels_url = PATCHPANELS_URL
    devices_url = DEVICES_URL
    
    constructor(private breadcrumbs: BreadcrumbService,
                private toastr: ToastrService,
                private patchcordService: PatchcordsService) {
        this.breadcrumbs.setItems([
            { title: 'Патчкорды', address: PATCHCORDS_URL }
        ])
    }

    ngOnInit(): void {
        this.patchcordService.getAll()
            .subscribe({
                next: (data) => {
                    this.patchcords = data
                    this.spinnerShow = false                    
                },
                error: (error) => {
                    this.toastr.error(error)
                }
            })
    }
}