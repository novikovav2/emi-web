import {Injectable} from "@angular/core";
import {Breadcrumb} from "../models/breadcrumb";
import {ROOT} from "../consts";

@Injectable()
export class BreadcrumbService {
  initialState: Breadcrumb = { title: 'Главная', address: ROOT}
  breadcrumbs: Breadcrumb[] = [ this.initialState ]

  addItem(breadcrumb: Breadcrumb) {
    this.breadcrumbs.push(breadcrumb)
  }

  setItems(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbs = [
      this.initialState,
      ...breadcrumbs
    ]
  }

  getItems() {
    return this.breadcrumbs
  }
}
