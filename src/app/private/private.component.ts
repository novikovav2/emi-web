import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AUTH_PAGE, LOGIN_PAGE} from "../consts";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  valid = false

  constructor(private auth: AuthService,
              private router: Router) {  }

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

  verify() {
    this.auth.verify()
      .subscribe({
        next: () => {
          this.valid = true
        },
        error: (e) => {
          this.valid = false
          console.log(e)
        }
      })
  }
}
