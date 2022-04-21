import {Component, OnInit} from "@angular/core";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {RACKS, ROOMS_URL} from "../../../consts";
import {RacksService} from "../../../services/racks.service";
import {ToastrService} from "ngx-toastr";
import {Rack} from "../../../models/rack";

@Component({
  selector: 'app-racks',
  templateUrl: './racks-index.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RacksIndexComponent implements OnInit {
  racks: Rack[] = []
  rooms_url = ROOMS_URL

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

  getData() {
    this.racksService.getAll()
      .subscribe({
        next: (data) => {
          this.racks = data
        },
        error: (error) => {
          this.toastr.error(error)
          console.log(error)
        }
      })
  }
}
