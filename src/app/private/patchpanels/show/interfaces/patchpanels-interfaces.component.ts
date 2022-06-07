import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../../models/patchpanel";
import {faCaretDown, faCaretUp, faSpinner, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {PatchpanelsService} from "../../../../services/patchpanels.service";
import {Interface} from "../../../../models/interface";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INTERFACE_CREATED, INTERFACE_DELETED} from "../../../../consts";
import {directionOrder, GetParams} from "../../../../models/get-params";

@Component({
  selector: 'app-patchpanel-interfaces',
  templateUrl: './patchpanels-interfaces.component.html',
  styleUrls: ['../../../private.component.scss']
})
export class PatchpanelsInterfacesComponent implements OnChanges {
  @Input() patchpanel: Patchpanel = PATCHPANEL_DEFAULT
  interfaces: Interface[] = []
  spinnerShow = true
  spinnerIcon = faSpinner
  trashIcon = faTrashCan
  orderBy = 'name'
  orderDirection: directionOrder = 'asc'
  sortAscIcon = faCaretDown
  sortDescIcon = faCaretUp

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

  getData(id: string) {
    const params: Partial<GetParams> = {
      order: this.orderBy,
      direction: this.orderDirection
    }
    this.patchpanelService.getInterfaces(id, params)
      .subscribe({
        next: (data) => {
          this.interfaces = data
          this.spinnerShow = false
        },
        error: (error) => {
          console.log(error)
          this.toastr.error(error)
        }
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

  changeOrder(order: string) {
    this.spinnerShow = true
    if (this.orderBy === order ) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc'
    } else  {
      this.orderBy = order
      this.orderDirection = 'asc'
    }

    this.getData(this.patchpanel.id)
  }
}
