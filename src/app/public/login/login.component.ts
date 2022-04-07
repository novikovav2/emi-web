import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {PRIVATE_PAGE} from "../../consts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../public.component.scss']
})
export  class LoginComponent {
  faSpin = faSpinner
  spinShow = false
  error = ''

  constructor(private auth: AuthService,
              private router: Router) {  }

  form = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    )
  })

  onSubmit() {
    this.form.disable()
    this.error = ''
    this.spinShow = true

    const email = this.form.controls['email'].value
    const password = this.form.controls['password'].value
    this.auth.signIn(email, password)
      .subscribe({
        next: () => {
          this.spinShow = false
          this.router.navigate([PRIVATE_PAGE])
        },
        error: (e) => {
          this.spinShow = false
          this.form.enable()
          this.error = e.message
        }
      })

  }
}
