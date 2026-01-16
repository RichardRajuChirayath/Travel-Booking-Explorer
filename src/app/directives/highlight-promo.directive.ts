import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[appHighlightPromo]',
    standalone: true
})
export class HighlightPromoDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        // Style element as a promotional banner/offer
        this.renderer.setStyle(this.el.nativeElement, 'background', 'linear-gradient(45deg, #ff6b6b, #ff8e53)');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 8px');
        this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4px');
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
        this.renderer.setStyle(this.el.nativeElement, 'font-size', '0.8rem');
        this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    }
}
