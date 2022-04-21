import {Component, Input} from "@angular/core";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {Breadcrumb} from "../../models/breadcrumb";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../private.component.scss']
})
export class HeaderComponent {
  @Input() title: string = ''
  breadcrumbs: Breadcrumb[] = [{title: '', address: ''}]

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs = this.breadcrumbService.getItems()
  }

}
