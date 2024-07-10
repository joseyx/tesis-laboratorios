import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAutoResize]'
})
export class AutoResizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement): void {
    this.adjustTextareaHeight(textarea);
  }

  private adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.overflowY = 'auto';
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Handle key events here if needed (e.g., to resize on Enter or specific keys)
    if (event.key === 'Enter' || event.key === 'Backspace') {
      this.adjustTextareaHeight(this.el.nativeElement);
    }
  }
}
