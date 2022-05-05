import {Component} from "@angular/core";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {RACKS} from "../../../consts";
import {RacksService} from "../../../services/racks.service";
import {RackNew} from "../../../models/rack";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-racks-new',
  templateUrl: './racks-new.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RacksNewComponent {

  constructor(private breadcrumbs: BreadcrumbService,
              private rackService: RacksService,
              private toastr: ToastrService,
              private router: Router) {
    this.breadcrumbs.setItems([
      {title: 'Стойки', address: '/' + RACKS},
      {title: 'Новая', address: '/' + RACKS}
    ])
  }

  onSubmit(rack: RackNew) {
    this.rackService.add(rack)
      .subscribe({
        next: (data) => {
          this.toastr.success("Стойка создана", data.name)
          this.router.navigate([RACKS])
        },
        error: (error) => {
          console.log(error)
          this.toastr.error(error)
        }
      })
  }

  onReset() {
    this.router.navigate([RACKS])
  }
}
