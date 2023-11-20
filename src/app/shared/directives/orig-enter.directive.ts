import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[origEnter]'
})
export class OriginateOnEnterDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup.enter', ['$event']) triggerChild(e: KeyboardEvent) {
    this.el.nativeElement.firstElementChild.click();
  }
}