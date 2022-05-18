import {Injectable} from "@angular/core";
import {INTERFACES_URL, PATCHPANELS_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {Patchpanel, PatchpanelForm, PatchpanelUpdated} from "../models/patchpanel";
import {environment} from "../../environments/environment";
import {retry} from "rxjs";
import {Interface} from "../models/interface";

@Injectable()
export class PatchpanelsService {
  url = PATCHPANELS_URL

  constructor(private http: HttpClient) {  }

  getAll() {
    return this.http.get<Patchpanel[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }

  add(patchpanel: PatchpanelForm) {
    return this.http.post<Patchpanel>(environment.apiUrl + this.url, patchpanel)
  }

  getOne(id: string) {
    return this.http.get<Patchpanel>(environment.apiUrl + this.url + '/' + id)
  }

  update(id: string, patchpanel: PatchpanelUpdated) {
    return this.http.post<Patchpanel>(environment.apiUrl + this.url + '/' + id, patchpanel)
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id)
  }

  getInterfaces(id: string) {
    return this.http.get<Interface[]>(environment.apiUrl + this.url + '/' + id + INTERFACES_URL )
  }

  addInterface(id:string, int: Partial<Interface>) {
    return this.http.post<Interface>(environment.apiUrl + this.url + '/' + id + INTERFACES_URL, int)
  }

  deleteInterface(id: string, intId: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id + INTERFACES_URL + '/' + intId)
  }
}
