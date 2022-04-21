import {Component} from "@angular/core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent {
  spinnerIcon = faSpinner
}
