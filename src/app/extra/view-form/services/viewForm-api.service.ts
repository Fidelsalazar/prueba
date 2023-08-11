import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewApiService {

  private baseUrl = 'https://3q8pjz0cpl.execute-api.us-east-1.amazonaws.com/api/Category';

  constructor(private http: HttpClient) { }

  removeCategory(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/Remove`;
    return this.http.post(url, null, { responseType: 'json' });
  }
}