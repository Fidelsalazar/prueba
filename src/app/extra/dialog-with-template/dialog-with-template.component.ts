import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//core/models/ => Interface
import { DialogWithTemplate } from '../../core/models/send/dialog-with-template';

@Component({
  selector: 'app-dialog-with-template',
  templateUrl: './dialog-with-template.component.html',
  styleUrls: ['./dialog-with-template.component.css']
})
export class DialogWithTemplateComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogWithTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formType: 'simpleform' | 'updateform' | 'viewform',  categoryData: { id: string; name: string; description: string } | null }
  ) {}

  public onCloseModal() {
    this.dialogRef.close();
  }

}
