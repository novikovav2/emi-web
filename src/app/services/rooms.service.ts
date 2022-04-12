import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Room} from "../models/room";
import {retry} from "rxjs";

@Injectable()
export class RoomsService {
  url = '/rooms'

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<Room[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }
}
