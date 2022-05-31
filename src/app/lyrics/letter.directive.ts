import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'span[letter]',
})
export class LetterDirective {
  @Input('letter') index: number;

  constructor(private elRef: ElementRef<HTMLSpanElement>) {}

  getLetter() {
    return this.elRef.nativeElement.textContent;
  }
  styleLetter() {
    this.elRef.nativeElement.style.color = 'red';
  }

  getOffsetTop() {
    return this.elRef.nativeElement.offsetTop;
  }

  setCursor() {
    const letter = this.elRef.nativeElement;
    letter.scrollIntoView({
      behavior: 'smooth',
    });
    if (letter.textContent === ' ') {
      letter.classList.add('cursor-bottom');
    } else {
      letter.classList.add('cursor-right');
    }
  }
  removeCursor() {
    this.elRef.nativeElement.classList.remove('cursor-right', 'cursor-bottom');
  }
}
