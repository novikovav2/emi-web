import {Component, OnInit, ViewChild} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../models/patchpanel";
import {faCirclePlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {PatchpanelsService} from "../../../services/patchpanels.service";
import {ToastrService} from "ngx-toastr";
import {NEW, PATCHPANELS_URL, RACKS_URL} from "../../../consts";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GetParams } from "src/app/models/get-params";

@Component({
  selector: 'app-patchpanels-index',
  templateUrl: './patchpanels-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class PatchpanelsIndexComponent implements OnInit{
  addIcon = faCirclePlus
  spinnerShow = true
  spinnerIcon = faSpinner
  new_url = NEW
  racks_url = RACKS_URL

  filterValue = ''
  @ViewChild(MatPaginator) paginator:any = MatPaginator
  @ViewChild(MatSort) sort:any = MatSort
  displayedColumns: string[] = ['name', 'rack', 'material']
  dataSource = new MatTableDataSource<Patchpanel>()

  constructor(private breadcrumbs: BreadcrumbService,
              private patchpanelService: PatchpanelsService,
              private toastr: ToastrService) {
    this.breadcrumbs.setItems([
      { title: 'Патчпанели', address: PATCHPANELS_URL }
    ])
  }

  ngOnInit() {
    this.getData()
  }

  getData(params: Partial<GetParams> = {}) {
    const getParams: Partial<GetParams> = {...params, filter: this.filterValue}
    this.patchpanelService.getAll(getParams)
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<Patchpanel>(data)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
          this.spinnerShow = false
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  sortFunction(sortState: Sort) {
    const params: Partial<GetParams> ={
      order: sortState.active,
      direction: sortState.direction
    }
    this.getData(params)
  }

  filter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value
    this.getData()
  }
}
