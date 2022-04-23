import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Room} from "../models/room";
import {retry} from "rxjs";
import {Rack} from "../models/rack";

@Injectable()
export class RoomsService {
  url = '/rooms'

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<Room[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }

  addRoom(room: Room) {
    return this.http.post<Room>(environment.apiUrl + this.url, room)
  }

  getRoom(id: string) {
    return this.http.get<Room>(environment.apiUrl + this.url + '/' + id)
  }

  updateRoom(room: Room) {
    return this.http.post<Room>(environment.apiUrl + this.url + '/' + room.id, room)
  }

  deleteRoom(id: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id)
  }

  getRacks(id: string) {
    return this.http.get<Rack[]>(environment.apiUrl + this.url + '/' + id + '/racks')
  }
}
