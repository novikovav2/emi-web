import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DEVICES_URL, PATCHCORDS_URL, PATCHCORD_DELETED, PATCHPANELS_URL, RACKS_URL } from "src/app/consts";
import { Patchcord, PATCHCORD_DEFAULT } from "src/app/models/patchcords";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { PatchcordsService } from "src/app/services/patchcords.service";

@Component({
    selector: 'app-patchcords-show',
    templateUrl: './patchcords-show.component.html',
    styleUrls: ['../../private.component.scss']
})
export class PatchcordsShowComponent implements OnInit {
    patchcord: Patchcord = PATCHCORD_DEFAULT
    racks_url = RACKS_URL
    devices_url = DEVICES_URL
    patchpanels_url = PATCHPANELS_URL

    constructor(private breadcrumbs: BreadcrumbService,
                private patchcordService: PatchcordsService,
                private toastr: ToastrService,
                private router: Router,
                private route: ActivatedRoute) {
        this.breadcrumbs.setItems([
            { title: 'Патчкорды', address: PATCHCORDS_URL },
            { title: 'Детали', address: '' }
        ])
    }

    ngOnInit(): void {
        const patchcordId = this.route.snapshot.paramMap.get('id')
        if (patchcordId) {
            this.getData(patchcordId)
        }
    }

    getData(id: string) {
        this.patchcordService.getOne(id)
            .subscribe({
                next: (data) => {
                    this.patchcord = data
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onDelete() {
        this.patchcordService.delete(this.patchcord.id)
            .subscribe({
                next: () => {
                    this.toastr.success(PATCHCORD_DELETED)
                    this.router.navigate([PATCHCORDS_URL])
                },
                error: (error) => { this.toastr.error(error) }
            })
    }
}