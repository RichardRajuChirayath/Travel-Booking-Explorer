import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlightTopRated]',
    standalone: true
})
export class HighlightTopRatedDirective implements OnChanges {
    @Input('appHighlightTopRated') rating: number = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(): void {
        if (this.rating >= 4.8) {
            // Apply "Top Rated" glow effect
            this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 15px rgba(255, 193, 7, 0.6)');
            this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #ffc107');
            this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

            // We could also append a badge element if we wanted more complex DOM manipulation
        } else {
            // Remove styles if reused or threshold changes
            this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
            this.renderer.removeStyle(this.el.nativeElement, 'border');
        }
    }
}
