import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Patchpanel, PATCHPANEL_DEFAULT} from "../../../../models/patchpanel";
import {faSpinner, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {PatchpanelsService} from "../../../../services/patchpanels.service";
import {Interface} from "../../../../models/interface";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INTERFACE_DELETED} from "../../../../consts";

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
    this.patchpanelService.getInterfaces(id)
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
        next: () => {
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
}
