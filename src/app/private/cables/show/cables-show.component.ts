import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CABLES_URL, CABLE_DELETED, DELETE_TXT, PATCHPANELS_URL, RACKS_URL } from "src/app/consts";
import { Cable, CABLE_DEFAULT } from "src/app/models/cable";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { CablesService } from "src/app/services/cables.service";

@Component({
    selector: 'app-cables-show',
    templateUrl: './cables-show.component.html',
    styleUrls: ['../../private.component.scss']
})
export class CablesShowComponent implements OnInit {
    cable: Cable = CABLE_DEFAULT
    racks_url = RACKS_URL
    patchpanels_url = PATCHPANELS_URL
    delete_txt = DELETE_TXT

    constructor(private breadcrumbs: BreadcrumbService,
                private cableService: CablesService,
                private toastr: ToastrService,
                private router: Router,
                private route: ActivatedRoute) {
        this.breadcrumbs.setItems([
            { title: 'Кабели СКС', address: CABLES_URL },
            { title: 'Детали', address: '' }
        ])
    }

    ngOnInit(): void {
        const cableId = this.route.snapshot.paramMap.get('id')
        if (cableId) {
            this.getData(cableId)
        }
    }

    getData(id: string) {
        this.cableService.getOne(id)
            .subscribe({
                next: (data) => { this.cable = data },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onDelete() {
        this.cableService.delete(this.cable.id)
            .subscribe({
                next: () => {
                    this.toastr.success(CABLE_DELETED)
                    this.router.navigate([CABLES_URL])
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

}