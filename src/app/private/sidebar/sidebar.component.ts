import {Component} from "@angular/core";
import {faAngleRight, faMagnifyingGlass, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../private.component.scss', './sidebar.component.scss' ]
})
export class SidebarComponent {
  iconSearch = faMagnifyingGlass
  iconList = faAngleRight
  iconExit = faRightFromBracket

  menuItems = [
    { title: 'Помещения', link: '/rooms'},
    { title: 'Стойки', link: '/racks'}
  ]

  // TODO: заставить работать поиск

  onExit() {
    console.log('exit')
  }
}
