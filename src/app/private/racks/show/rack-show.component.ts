import {Component, OnInit} from "@angular/core";
import {Rack, RACK_DEFAULT} from "../../../models/rack";
import {RacksService} from "../../../services/racks.service";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {ToastrService} from "ngx-toastr";
import {RACKS_URL} from "../../../consts";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-rack-show',
  templateUrl: './rack-show.component.html',
  styleUrls: ['../../private.component.scss']
})
export class RackShowComponent implements OnInit{
  rack: Rack = RACK_DEFAULT

  constructor(private rackService: RacksService,
              private breadcrumbs: BreadcrumbService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
    this.breadcrumbs.setItems([
      {title: 'Стойки', address: RACKS_URL},
      {title: 'Детали', address: ''}
    ])
  }

  ngOnInit() {
    const rackId = this.route.snapshot.paramMap.get('id')
    if (rackId) {
      this.getRackData(rackId)
    }
  }

  getRackData(id: string) {
    this.rackService.getOne(id)
      .subscribe({
        next: (data) => {
          this.rack = data
        },
        error: (error) => {
          this.toastr.error(error)
          console.log(error)
        }
      })
  }
}
