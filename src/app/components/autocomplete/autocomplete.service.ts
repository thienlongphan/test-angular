import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  //   private API_URL = 'https://dummyjson.com/users?limit=5&skip=10&select=firstName,age'; // Replace with actual API URL
  private API_URL = 'https://dummyjson.com/users/search'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getResults(
    query: string = '',
    page: number = 1,
    pageSize: number = 20
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', pageSize);
    params = params.append('skip', page < pageSize ? page : page + pageSize);
    params = params.append('q', query);

    return this.http.get<any>(this.API_URL, { params });
  }
}
