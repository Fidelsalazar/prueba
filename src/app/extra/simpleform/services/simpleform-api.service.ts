import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Ajv from 'ajv';
//Interface
import { CreateResponse } from 'src/app/core/models/response/CreateResponse.interface';
import { CreateSend } from 'src/app/core/models/send/CreateSend.interface';

@Injectable({
  providedIn: 'root'
})

export class CreateCategoryApiService {

  private url = "https://3q8pjz0cpl.execute-api.us-east-1.amazonaws.com";

  constructor(public http:HttpClient) { }

  public postCreateCategory(form:CreateSend):Observable<CreateResponse>{
    let address = this.url + "/api/Category"

    if (form.name && form.name.length < 8) {
      // Handle invalid name length here, e.g., show error message to user
      
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(form);

    return this.http.post<CreateResponse>(address,form,{
      headers
    });
  }
}
