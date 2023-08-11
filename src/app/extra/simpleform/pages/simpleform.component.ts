import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//Service
import { CreateCategoryApiService } from '../services/simpleform-api.service';
//Models
import { CreateSend } from 'src/app/core/models/send/CreateSend.interface';
import { CreateResponse } from 'src/app/core/models/response/CreateResponse.interface';
import { CheckmodalComponent } from '../../checkmodal/checkmodal.component';
import { ErrormodalComponent } from '../../errormodal/errormodal.component';
import { DialogWithTemplateComponent } from '../../dialog-with-template/dialog-with-template.component';

@Component({
  selector: 'app-simpleform',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simpleform.component.css']
})

export class SimpleformComponent {

  bsModalRef!: BsModalRef ;

  createForm : FormGroup ;

  public categories = [{
    name: '',
    description: '',
    id: ''
  }];

  Form ={
    "pageNo": 0,
    "pageSize": 0,
    "filters": null
  }

  constructor (
    private fb: FormBuilder,
    private apiCreate:CreateCategoryApiService,
    private bsModalService: BsModalService,
    private dialogClose: DialogWithTemplateComponent
  ) {
    this.createForm =this.fb.group({
      name : new FormControl('', [Validators.required,Validators.minLength(5)]),
      description : new FormControl('',Validators.required),
    })
  }



  openAnimatedCheckModal(){
    this.dialogClose.onCloseModal()    

    this.bsModalRef = this.bsModalService.show(CheckmodalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered'
    });
    this.bsModalRef.content.onAnimationFinished.subscribe(() => {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, 1000);
    });
  }

  openAnimatedErrorModal(errorMessage: string){

    this.bsModalRef = this.bsModalService.show(ErrormodalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered'
    });

    this.bsModalRef.content.errorMessage = errorMessage;

    this.bsModalRef.content.onAnimationFinished.subscribe(() => {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, 1000);
    });
  }


  onSendRute(form: CreateSend){
    console.log(form);
    this.apiCreate.postCreateCategory(form).subscribe(data =>{
      console.log(data);
      let dataResponse : CreateResponse = data;
      if(dataResponse.success == true ){
        this.openAnimatedCheckModal();
      }else{
        this.openAnimatedErrorModal(dataResponse.message);
      }
    });
  }

  get name() {
    return this.createForm.get('name');
  }
}