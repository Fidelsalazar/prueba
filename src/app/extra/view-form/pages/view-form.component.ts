import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryComponent } from 'src/app/modules/category/pages/category.component';
import { ViewApiService } from '../services/viewForm-api.service'; // Asegúrate de que esta importación sea correcta
import { Observer } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogWithTemplateComponent } from '../../dialog-with-template/dialog-with-template.component';
import { ErrormodalComponent } from '../../errormodal/errormodal.component';
import { CheckmodalComponent } from '../../checkmodal/checkmodal.component';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent {

  dataCategory = this.category.selectedCategory;

  bsModalRef!: BsModalRef ;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private category: CategoryComponent,
    private viewApiService: ViewApiService,
    private BSmodalService: BsModalService,
    private dialogClose : DialogWithTemplateComponent ,
  ) {
    this.dataCategory = data.categoryData;
  }

  onDeleteCategory(categoryId: string) {
    if (categoryId) {
      const observer: Observer<any> = {
        next: (response) => {
          console.log('Response:', response);
          if(response.success === false){
            this.openAnimatedErrorModal(response.message);
          }else{
            this.openAnimatedCheckModal();
          }
          
        },
        error: (error) => {
          console.error('Error:', error);
          // Manejar el error según tus necesidades
        },
        complete: () => {
          // Manejar la completitud según tus necesidades
        }
      };
  
      this.viewApiService.removeCategory(categoryId).subscribe(observer);
    }
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
}

