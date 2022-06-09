import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry } from "rxjs";
import { environment } from "src/environments/environment";
import { PATCHCORDS_URL } from "../consts";
import { Patchcord, PatchcordNewForm } from "../models/patchcords";

@Injectable()
export class PatchcordsService {
    url = environment.apiUrl + PATCHCORDS_URL

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Patchcord[]>(this.url)
                    .pipe(retry(2))
    }

    getOne(id: string) {
        return this.http.get<Patchcord>(this.url + '/' + id)
    }

    add(patchcord: PatchcordNewForm) {
        return this.http.post<Patchcord>(this.url, patchcord)
    }
}