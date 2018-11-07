import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private web3Url = 'http://localhost:3000/api/web3';
    constructor(private http: HttpClient) {}

    createWeb3(datadir: string): Observable<any>{
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
        return this.http.post<string>(this.web3Url, datadir,{
            headers: headers
        });
    }
}