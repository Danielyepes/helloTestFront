import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn : "root"})

export class ServiceClient {

    private apiUrl : string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getServices(): Observable<Service[]> {
        return this.http
            .get<Service[]>(this.apiUrl + '/test/services')
    }

}
