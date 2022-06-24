import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry } from "rxjs";
import { environment } from "src/environments/environment";
import { CABLES_URL } from "../consts";
import { Cable, CableNewForm } from "../models/cable";

@Injectable()
export class CablesService {
    url = environment.apiUrl + CABLES_URL

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Cable[]>(this.url)
                    .pipe(retry(2))
    }

    add(cable: CableNewForm) {
        return this.http.post<Cable>(this.url, cable)
    }
}