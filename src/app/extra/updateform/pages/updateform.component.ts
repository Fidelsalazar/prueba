import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//Service
import { UpdateApiService } from '../services/updateform-api.service';
//Models
import { CreateResponse } from 'src/app/core/models/response/CreateResponse.interface';
import { CheckmodalComponent } from '../../checkmodal/checkmodal.component';
import { ErrormodalComponent } from '../../errormodal/errormodal.component';
import { DialogWithTemplateComponent } from '../../dialog-with-template/dialog-with-template.component';
import { CategoryApiService } from 'src/app/modules/category/services/category-api.service';
import { SearchResponse } from 'src/app/core/models/response/SearchI.interface';
import { ModSend } from 'src/app/core/models/send/ModSend.interface';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})

export class UpdateformComponent{

  bsModalRef!: BsModalRef ;

  showCategoryList = false;

  createForm : FormGroup | undefined ;

  modForm : FormGroup ;

  nameControl = new FormControl()

  form: FormGroup = new FormGroup({
    name: this.nameControl
  });

  selectedCategory: { id: string; description:string; name: string } | null = null;

  
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
    private apiUpdate:UpdateApiService,
    private BSmodalService: BsModalService,
    private dialogClose : DialogWithTemplateComponent ,
    private api : CategoryApiService,   
  ) {
    this.modForm =this.fb.group({
      id : new FormControl('', Validators.required),
      name : new FormControl('', [Validators.required,Validators.minLength(5)]),
      description : new FormControl('',Validators.required),
    })
  }

  public ngOnInit(): void {
    console.log(this.Form);
    this.api.postSearch(this.Form).subscribe(data => {
      console.log(data);
      let dataResponse: SearchResponse = data;
      this.categories = dataResponse.items;
      console.log('categories simple form', this.categories); 
    });
  }

  openAnimatedCheckModal(){

    this.dialogClose.onCloseModal()  

    this.bsModalRef = this.BSmodalService.show(CheckmodalComponent, {
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

    this.bsModalRef = this.BSmodalService.show(ErrormodalComponent, {
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


  onSendRute(form: ModSend) {
    console.log( "onSend",form);
  
    const categoryId = form.id;  
  
    if (categoryId) {
      this.apiUpdate.updateCategory(categoryId, form).subscribe(data => {
        console.log("data",data);
        let dataResponse: CreateResponse = data;
  
        if (dataResponse.success === true) {
          this.openAnimatedCheckModal();
        } else {
          this.openAnimatedErrorModal(dataResponse.message);
        }
      });
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showCategoryList = false;
    }, 200);
  }
  
   
  selectCategory(category: { id: string; name: string; description: string }) {
    this.selectedCategory = {
      id: category.id,
      name: category.name,
      description: category.description
    };
    this.modForm.patchValue({
      id: category.id,
      name: category.name,
      description: category.description
    });
    this.showCategoryList = false;
    console.log("selected", this.selectedCategory, this.nameControl, this.showCategoryList);
  }

  
  get name() {
    return this.modForm.get('name');
  }

}

