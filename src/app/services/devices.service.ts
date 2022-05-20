import {Injectable} from "@angular/core";
import {DEVICES_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {Device, DeviceForm} from "../models/device";
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

  add(device: DeviceForm) {
    return this.http.post<Device>(environment.apiUrl + this.url, device)
  }
}