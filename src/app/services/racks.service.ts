import {Injectable} from "@angular/core";
import {PATCHPANELS_URL, RACKS_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {retry} from "rxjs";
import {Rack, RackNew, RackUpdated} from "../models/rack"
import {Patchpanel} from "../models/patchpanel";

@Injectable()
export class RacksService {
  url = RACKS_URL

  constructor(private http: HttpClient) {  }

  getAll() {
    return this.http.get<Rack[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }

  getOne(id: string) {
    return this.http.get<Rack>(environment.apiUrl + this.url + '/' + id)
  }

  add(rack: RackNew) {
    return this.http.post<Rack>(environment.apiUrl + this.url, rack)
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id)
  }

  update(rack: RackUpdated) {
    return this.http.post<Rack>(environment.apiUrl + this.url + '/' + rack.id, rack)
  }

  getPatchpanels(id: string) {
    return this.http.get<Patchpanel[]>(environment.apiUrl + this.url + '/' + id + PATCHPANELS_URL)
  }
}
