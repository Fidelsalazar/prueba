import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogWithTemplateComponent } from '../../../extra/dialog-with-template/dialog-with-template.component';
import { DialogWithTemplate } from '../../../core/models/send/dialog-with-template';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  activeFormType: 'simpleform' | 'updateform' | 'viewform' |null = null;
  
  constructor(private dialog: MatDialog) {
  }

  openDialogWithTemplate(formType: 'simpleform' | 'updateform' | 'viewform',categoryData: { id: string; name: string; description: string }|null) {
    this.activeFormType = formType; // Establece el tipo de formulario activo
    const dialogRef = this.dialog.open(DialogWithTemplateComponent, {
      data: {
        formType: formType,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.activeFormType = null; // Resetea el tipo de formulario activo cuando el diálogo se cierra
    });
  }

  getActivateFormType(){
    return this.activeFormType 
  }
}