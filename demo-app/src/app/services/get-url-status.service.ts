import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUrlStatusService {

  constructor(private http: HttpClient) { }

  getUrlStatus(url: string): Observable<any> {
    return this.http.get(url, {observe: 'response'});
  }
}
