import {Injectable} from "@angular/core";
import {DEVICES_URL, INTERFACES_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {Device, DeviceForm, DeviceUpdated} from "../models/device";
import {environment} from "../../environments/environment";
import {retry} from "rxjs";
import { GetParams } from "../models/get-params";
import { Interface } from "../models/interface";

@Injectable()
export class DevicesService {
  url = DEVICES_URL

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Device[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }

  getOne(id: string) {
    return this.http.get<Device>(environment.apiUrl + this.url + '/' + id)
  }

  add(device: DeviceForm) {
    return this.http.post<Device>(environment.apiUrl + this.url, device)
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id)
  }

  update(id: string, device: DeviceUpdated) {
    return this.http.post<Device>(environment.apiUrl + this.url + '/' + id, device)
  }

  getInterfaces(id: string, params: Partial<GetParams>) {
    return this.http.get<Interface[]>(environment.apiUrl + this.url + '/' + id + INTERFACES_URL, {
      params: params
    })
  }

  addInterface(id: string, int: Partial<Interface>) {
    return this.http.post<Interface>(environment.apiUrl + this.url + '/' + id + INTERFACES_URL, int)
  }

  deleteInterface(id: string, intid: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id + INTERFACES_URL + '/' + intid)
  }
}
