import {Injectable} from "@angular/core";
import {RACKS_URL} from "../consts";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {retry} from "rxjs";
import {Rack} from "../models/rack"

@Injectable()
export class RacksService {
  url = RACKS_URL

  constructor(private http: HttpClient) {  }

  getAll() {
    return this.http.get<Rack[]>(environment.apiUrl + this.url)
      .pipe(retry(2))
  }
}
