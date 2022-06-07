import {Injectable} from "@angular/core";
import {DEVICES_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {Device, DeviceForm, DeviceUpdated} from "../models/device";
import {environment} from "../../environments/environment";
import {retry} from "rxjs";

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
}
