import {Component, OnInit} from "@angular/core";
import {faAngleRight, faMagnifyingGlass, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth.service";
import {AUTH_PAGE, LOGIN_PAGE, RACKS, ROOMS} from "../../consts";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../private.component.scss', './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
  iconSearch = faMagnifyingGlass
  iconList = faAngleRight
  iconExit = faRightFromBracket

  menuItems = [
    { title: 'Помещения', link: ROOMS, active: false },
    { title: 'Стойки', link: RACKS, active: false }
  ]

  constructor(private auth: AuthService,
              private router: Router) {  }

  // TODO: заставить работать поиск

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd )
      )
      .subscribe(event => {
        if (event.urlAfterRedirects) {
          const url = event.urlAfterRedirects.split('/')[1]
          this.menuItems.forEach((item) => {
            item.active = item.link === url
          })
        }
        console.log(this.menuItems)
      })
  }

  logout() {
    this.auth.signOut()
      .subscribe({
        next: () => {
          this.router.navigate([AUTH_PAGE + '/' + LOGIN_PAGE])
        },
        error: (e) => {
          console.log(e)
        }
      })
  }
}