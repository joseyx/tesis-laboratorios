import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmar',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.scss']
})
export class ModalConfirmarComponent {
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.confirm.emit(false);
  }
}
