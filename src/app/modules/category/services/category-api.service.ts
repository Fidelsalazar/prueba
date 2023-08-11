import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Ajv from 'ajv';
//Interface
import { SearchResponse } from 'src/app/core/models/response/SearchI.interface';
import { SearchSend } from 'src/app/core/models/send/SearchSend.interface';

@Injectable({
  providedIn: 'root'
})

export class CategoryApiService {

  private url = "https://3q8pjz0cpl.execute-api.us-east-1.amazonaws.com";

  constructor(public http:HttpClient) { }

  public postSearch(form:SearchSend):Observable<SearchResponse>{
    let address = this.url + "/api/Category/Search"

    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    };

    const ajv = new Ajv();

    ajv.addSchema(schema);

    const valid = ajv.validate(schema, form);
  
    if (!valid) {
      throw new Error('The form is not valid.');
    }

    return this.http.post<SearchResponse>(address,form,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
