import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
//Service
import { CategoryApiService } from '../services/category-api.service';
import { SharedDataService } from '../services/shared-data-service.service';
//Models

import { SearchResponse } from 'src/app/core/models/response/SearchI.interface';

import { DialogService } from '../../navbar/services/dialog.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
    
  showModal = false;

  public selectedCategory!: { id: string; name: string; description: string; };

  public categories = [{
    name: '',
    description: '',
    id: ''
  }];


  constructor(
    private api:CategoryApiService,
    private dialogService: DialogService,
  ){}

  Form ={
    "pageNo": 0,
    "pageSize": 100,
    "filters": null
  }
  
  searchForm=new FormGroup({
    Alias : new FormControl<boolean>(false),
    Value : new FormControl<boolean>(false)
  })

  public ngOnInit(): void {
    console.log(this.Form);
    this.api.postSearch(this.Form).subscribe(data => {
      console.log(data);
      let dataResponse: SearchResponse = data;
      this.categories = dataResponse.items;
      console.log('categories', this.categories);      
    });
  }

  openDialogWithViewForm(category: { id: string; name: string; description: string }) {
    this.selectedCategory = category;
    console.log('selectedCategory',this.selectedCategory)
    this.dialogService.openDialogWithTemplate('viewform', this.selectedCategory);
    console.log('ok',this.dialogService.getActivateFormType())
  }
  
  getCategories(): any[] {
    return this.categories;
  }

}
