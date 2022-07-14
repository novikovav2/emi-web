import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['../../private.component.scss']
})
export class TableComponent {
    @Input() data: any[] = []
    @Input() columns: any[] = []
}