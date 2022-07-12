import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DEVICES_URL, LOGICAL_LINKS_URL, LOGICAL_LINK_DELETED, RACKS_URL, DELETE_TXT } from "src/app/consts";
import { LogicalLink, LOGICAL_LINK_DEFAULT } from "src/app/models/logical-link";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { LogicalLinksService } from "src/app/services/logical-links.service";

@Component({
    selector: 'app-logical-links-show',
    templateUrl: './logical-links-show.component.html',
    styleUrls: ['../../private.component.scss']
})
export class LogicalLinksShowComponent implements OnInit{
    logicalLink: LogicalLink = LOGICAL_LINK_DEFAULT
    racks_url = RACKS_URL
    devices_url = DEVICES_URL
    delete_txt = DELETE_TXT
    title: string = ''

    constructor(private breadcrumbs: BreadcrumbService,
                private logicalLinkService: LogicalLinksService,
                private toastr: ToastrService,
                private router: Router,
                private route: ActivatedRoute) {
        this.breadcrumbs.setItems([
            { title: 'Логические связи', address: LOGICAL_LINKS_URL },
            { title: 'Детали', address: '' }
        ])
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id) {
            this.getData(id)
        }
    }

    getData(id: string) {
        this.logicalLinkService.getOne(id)
            .subscribe({
                next: (data) => { 
                    this.logicalLink = data 
                    this.title = this.logicalLink.start.rack.name + '.'
                                    + this.logicalLink.start.device.name + '.'
                                    + this.logicalLink.start.interface.name 
                                    + ' -> '
                                    + this.logicalLink.end.rack.name + '.'
                                    + this.logicalLink.end.device.name + '.'
                                    + this.logicalLink.end.interface.name 
                },
                error: (error) => { this.toastr.error(error) }
            })
    }

    onDelete() {
        this.logicalLinkService.delete(this.logicalLink.id)
            .subscribe({
                next: () => {
                    this.toastr.success(LOGICAL_LINK_DELETED),
                    this.router.navigate([LOGICAL_LINKS_URL])
                },
                error: (error) => { this.toastr.error(error) }
            })
    }
}