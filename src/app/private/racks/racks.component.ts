import {Component} from "@angular/core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-racks',
  templateUrl: './racks.component.html',
  styleUrls: ['../private.component.scss']
})
export class RacksComponent {
  spinnerIcon = faSpinner
}
