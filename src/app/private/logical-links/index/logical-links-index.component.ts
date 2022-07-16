import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { faCirclePlus, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { DEVICES_URL, LOGICAL_LINKS_URL, NEW, RACKS_URL } from "src/app/consts";
import { LogicalLink } from "src/app/models/logical-link";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { LogicalLinksService } from "src/app/services/logical-links.service";

@Component({
    selector: 'app-logical-links-index',
    templateUrl: './logical-links-index.component.html',
    styleUrls: ['../../private.component.scss']
})
export class LogicalLinksIndexComponent implements OnInit {
    logicalLinks: LogicalLink[] = []
    addIcon = faCirclePlus
    spinnerShow = true
    spinnericon = faSpinner
    viewIcon = faEye
    new_url = NEW
    racks_url = RACKS_URL
    devices_url = DEVICES_URL

    displayedColumns: string[] = ['rowAction', 'startRack', 'startDevice', 'startInterface',
                                                'endRack', 'endDevice', 'endInterface', 'type'];
    dataSource = new MatTableDataSource<LogicalLink>()


    constructor(private breadcrumbs: BreadcrumbService,
                private toastr: ToastrService,
                private logicalLinkService: LogicalLinksService) {
        this.breadcrumbs.setItems([
            { title: 'Логические связи', address: LOGICAL_LINKS_URL }
        ])
    }

    ngOnInit(): void {
        this.logicalLinkService.getAll()
            .subscribe({
                next: (data) => {
                    this.logicalLinks = data
                    this.spinnerShow = false
                    this.dataSource = new MatTableDataSource(data)
                },
                error: (error) => { this.toastr.error(error) }
            })
    }
}