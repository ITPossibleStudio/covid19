import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getWorldData(): Observable<any> {
    return this.http.get<any>('https://covidapi.info/api/v1/global');
  }

  getCountryData(): Observable<any> {
    return this.http.get<any>('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php');
  }
}
