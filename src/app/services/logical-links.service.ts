import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LOGICAL_LINKS_URL } from "../consts";
import { LogicalLink, LogicalLinkNewForm } from "../models/logical-link";

@Injectable()
export class LogicalLinksService {
    url = environment.apiUrl + LOGICAL_LINKS_URL

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<LogicalLink[]>(this.url)
    }

    getOne(id: string) {
        return this.http.get<LogicalLink>(this.url + '/' + id)
    }

    add(logicalLink: LogicalLinkNewForm) {
        return this.http.post<LogicalLink>(this.url, logicalLink)
    }

    delete(id: string) {
        return this.http.delete(this.url + '/' + id)
    }
}