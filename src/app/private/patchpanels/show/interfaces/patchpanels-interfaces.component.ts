import {Component, Input, OnChanges, SimpleChanges, ViewChild} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../../models/patchpanel";
import { faSpinner, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {PatchpanelsService} from "../../../../services/patchpanels.service";
import {Interface} from "../../../../models/interface";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INTERFACE_CREATED, INTERFACE_DELETED} from "../../../../consts";
import { GetParams} from "../../../../models/get-params";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-patchpanel-interfaces',
  templateUrl: './patchpanels-interfaces.component.html',
  styleUrls: ['../../../private.component.scss']
})
export class PatchpanelsInterfacesComponent implements OnChanges {
  @Input() patchpanel: Patchpanel = PATCHPANEL_DEFAULT
  spinnerShow = true
  spinnerIcon = faSpinner
  trashIcon = faTrashCan

  @ViewChild(MatPaginator) paginator:any = MatPaginator
  @ViewChild(MatSort) sort:any = MatSort
  displayedColumns: string[] = ['name', 'connected', 'action']
  dataSource = new MatTableDataSource<Interface>()

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  constructor(private patchpanelService: PatchpanelsService,
              private toastr: ToastrService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const id = changes['patchpanel'].currentValue.id
    if (id) {
      this.getData(id)
    }
  }

  getData(id: string, params: Partial<GetParams> = {}) {
    this.patchpanelService.getInterfaces(id, params)
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<Interface>(data)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
          this.spinnerShow = false
        },
        error: (error) => { this.toastr.error(error) }
      })
  }

  onSubmit() {
    const int = {
      name: this.form.controls['name'].value
    }
    this.patchpanelService.addInterface(this.patchpanel.id, int)
      .subscribe({
        next: (data) => {
          this.toastr.success(INTERFACE_CREATED, data.name)
          this.form.reset()
          this.spinnerShow = true
          this.getData(this.patchpanel.id)
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  onDelete(intId: string) {
    this.patchpanelService.deleteInterface(this.patchpanel.id, intId)
      .subscribe({
        next: () => {
          this.toastr.success(INTERFACE_DELETED)
          this.spinnerShow = true
          this.getData(this.patchpanel.id)
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
    this.getData(this.patchpanel.id, params)
  }
}
