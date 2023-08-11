import { Component, TemplateRef } from '@angular/core';
//Service
import {DialogService} from '../services/dialog.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  showModal = false;

  categoryData= null;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor (
    private dialogService: DialogService,
  ) {}


  openDialogWithSimpleForm() {
    this.dialogService.openDialogWithTemplate('simpleform',  this.categoryData);
  }


  openDialogWithUpdateForm() {
    this.dialogService.openDialogWithTemplate('updateform', this.categoryData);
  }

}
