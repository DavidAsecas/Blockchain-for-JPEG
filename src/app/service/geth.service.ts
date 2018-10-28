import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../interface/config';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class GethService {
    private gethUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) {}

    addBlockchain(config: Config): Observable<Config>{
        return this.http.post<Config>(this.gethUrl, config)
    }

    test(conf: string) {
        return this.http.get(this.gethUrl);
    }
}