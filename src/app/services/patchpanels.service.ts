import {Injectable} from "@angular/core";
import {PATCHPANELS_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {Patchpanel} from "../models/patchpanel";
import {environment} from "../../environments/environment";
import {retry} from "rxjs";

@Injectable()
export class PatchpanelsService {
  url = PATCHPANELS_URL

  constructor(private http: HttpClient) {  }

  getAll() {
    return this.http.get<Patchpanel[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }

}