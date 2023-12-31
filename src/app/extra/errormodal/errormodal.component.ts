import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrormodalComponent {
  @Output() onAnimationFinished = new EventEmitter<void>();
  @Input()errorMessage: string = '';
  
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.onAnimationFinished.emit();
    }, 2000);
  }
}
