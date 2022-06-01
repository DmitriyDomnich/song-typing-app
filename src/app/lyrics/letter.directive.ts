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

  scroll() {
    const letter = this.elRef.nativeElement;

    const container = letter.parentElement!;
    const { scrollHeight, clientHeight } = container;
    console.log(
      `
      ${this.getOffsetTop()} > ${clientHeight / 2} &&
      ${this.getOffsetTop()} < ${scrollHeight - clientHeight / 2}`
    );
    if (
      this.getOffsetTop() > clientHeight / 2 &&
      this.getOffsetTop() < scrollHeight - clientHeight / 2
    ) {
      console.log('scrolling');
      container.scrollBy(0, parseInt(getComputedStyle(letter).fontSize) * 1.5);
    }
  }

  setCursor() {
    const letter = this.elRef.nativeElement;

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
