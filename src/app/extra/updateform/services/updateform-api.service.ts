import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Ajv from 'ajv';
//Models
import { CreateResponse } from 'src/app/core/models/response/CreateResponse.interface';
import { CreateSend } from 'src/app/core/models/send/CreateSend.interface';

import { SearchSend } from 'src/app/core/models/send/SearchSend.interface';
import { SearchResponse } from 'src/app/core/models/response/SearchI.interface';
import { ModSend } from 'src/app/core/models/send/ModSend.interface';

@Injectable({
  providedIn: 'root'
})

export class UpdateApiService {

  private url = "https://3q8pjz0cpl.execute-api.us-east-1.amazonaws.com";

  constructor(public http:HttpClient) { }

  public updateCategory(id: string, form: ModSend): Observable<CreateResponse> {
    // Construye la URL completa con el ID
    let address = this.url + "/api/Category/" + id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const formSend ={
      "name": form.name,
      "description" :form.description
    }

    return this.http.put<CreateResponse>(address, formSend, {
      headers
    });
  }

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
