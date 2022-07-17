import {Component, OnInit, ViewChild} from "@angular/core";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {NEW, RACKS, RACKS_URL, ROOMS_URL} from "../../../consts";
import {RacksService} from "../../../services/racks.service";
import {ToastrService} from "ngx-toastr";
import {Rack} from "../../../models/rack";
import {faCirclePlus, faL, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { GetParams } from "src/app/models/get-params";

@Component({
  selector: 'app-racks',
  templateUrl: './racks-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RacksIndexComponent implements OnInit {
  rooms_url = ROOMS_URL
  racks_url = RACKS_URL
  new_url = NEW
  addIcon = faCirclePlus
  spinnerShow = true
  spinnerIcon = faSpinner
  filterValue = ''

  @ViewChild(MatPaginator) paginator:any = MatPaginator
  @ViewChild(MatSort) sort:any = MatSort

  displayedColumns: string[] = ['name', 'room']
  dataSource= new MatTableDataSource<Rack>() 

  constructor(private breadcrumbs: BreadcrumbService,
              private racksService: RacksService,
              private toastr: ToastrService) {
    this.breadcrumbs.setItems([
      { title: 'Стойки', address: '/' + RACKS}
    ])
  }

  ngOnInit() {
    this.getData()
  }

  getData(params: Partial<GetParams> = {}) {
    const getParams: Partial<GetParams> = {...params, filter: this.filterValue }
    this.racksService.getAll(getParams)
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<Rack>(data)
          this.spinnerShow = false
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  sortFunction(sortState: Sort) {
    const params: Partial<GetParams> = {
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
