import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../private.component.scss']
})
export class HeaderComponent {
  @Input() title: string = ''
  breadcrumbs = ['Главная', 'Помещения', 'Новое']

}
