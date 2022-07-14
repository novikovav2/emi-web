import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { faCirclePlus, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { DEVICES_URL, LOGICAL_LINKS_URL, NEW, RACKS_URL } from "src/app/consts";
import { LogicalLink } from "src/app/models/logical-link";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { LogicalLinksService } from "src/app/services/logical-links.service";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];



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
                    // this.displayedColumns = ['startRack'];
                    this.dataSource = new MatTableDataSource(data)
                },
                error: (error) => { this.toastr.error(error) }
            })
    }
}