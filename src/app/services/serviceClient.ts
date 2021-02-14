import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    getService(id : string): Observable<Service> {
      let url = this.apiUrl + '/test/service/'+id;

      return this.http.get<Service>(url);
  }


    addServices(service: Service) : Observable<Service> {
      let url = this.apiUrl + "/test/service";

      return this.http
        .post<Service>(url, service);

    }

    updateService(service: Service) : Observable<Service> {
      let url = this.apiUrl + "/test/service";

      return this.http
        .put<Service>(url, service);

    }

    deleteService(id: string) :Observable<Service>{
      let url = this.apiUrl + '/test/service/'+id;

      return this.http
        .delete<Service>(url);

    }

}
