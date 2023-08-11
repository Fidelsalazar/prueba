import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
//Routing
import { AppRoutingModule } from './app-routing.module';
//modules
import { CategoryComponent } from './modules/category/pages/category.component';
import { NavbarComponent } from './modules/navbar/pages/navbar.component';
import { SimpleformComponent } from './extra/simpleform/pages/simpleform.component';
import { CheckmodalComponent } from './extra/checkmodal/checkmodal.component';
import { ErrormodalComponent } from './extra/errormodal/errormodal.component';
//Services
import { CategoryApiService } from './modules/category/services/category-api.service';
import { DialogWithTemplateComponent } from './extra/dialog-with-template/dialog-with-template.component';
import { UpdateformComponent } from './extra/updateform/pages/updateform.component';
import { UpdateApiService } from './extra/updateform/services/updateform-api.service';
import { SharedDataService } from './modules/category/services/shared-data-service.service';
import { DialogService } from './modules/navbar/services/dialog.service';
import { ViewFormComponent } from './extra/view-form/pages/view-form.component';
import { ViewApiService } from './extra/view-form/services/viewForm-api.service';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    NavbarComponent,
    DialogWithTemplateComponent,
    SimpleformComponent,
    CheckmodalComponent,
    ErrormodalComponent,
    UpdateformComponent,
    ViewFormComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,  
  ],
  providers: [
    SharedDataService,
    UpdateApiService,
    CategoryApiService,
    DialogService,
    NavbarComponent,
    CategoryComponent,
    ViewFormComponent,
    ViewApiService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
