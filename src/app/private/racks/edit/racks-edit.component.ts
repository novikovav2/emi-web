import {Component, OnInit} from "@angular/core";
import {Rack, RACK_DEFAULT, RackNew, RackUpdated} from "../../../models/rack";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {RacksService} from "../../../services/racks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RACKS} from "../../../consts";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-racks-edit',
  templateUrl: './racks-edit.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RacksEditComponent implements OnInit {
  rack: Rack = RACK_DEFAULT
  spinnerIcon = faSpinner
  spinnerShow = true

  constructor(private breadcrumbs: BreadcrumbService,
              private rackService: RacksService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
    this.breadcrumbs.setItems([
      {title: 'Помещения', address: '/' + RACKS},
      {title: 'Изменить', address: '/' + RACKS}
    ])
  }

  ngOnInit() {
    const rackId = this.route.snapshot.paramMap.get('id')
    if (rackId) {
      this.rackService.getOne(rackId)
        .subscribe({
          next: (data) => {
            this.rack = data
            this.spinnerShow = false
          },
          error: (error) => {
            this.toastr.error(error)
          }
        })
    }
  }

  onSubmit(rack: RackNew) {
    const rackUpdated: RackUpdated = {
      id: this.rack.id,
      name: rack.name
    }
    this.rackService.update(rackUpdated)
      .subscribe({
        next: (data) => {
          this.toastr.success("Данные обновлены")
          this.router.navigate([RACKS, data.id])
        },
        error: (error) => {
          this.toastr.error(error)
        }
      })
  }

  onReset() {
    this.router.navigate([RACKS])
  }
}
