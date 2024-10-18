import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements AfterViewInit {

  @Input() highlight = 'yellow'

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.highlight)
  }
  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('lightgreen')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.highlight)
  }

  @HostListener('click') onClick() {
    this.highlight = 'lightgreen'
  }
}
