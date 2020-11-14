import { Component, ElementRef, Input} from '@angular/core';
//import {Directive, ElementRef, Input} from '@angular/core';

/*
  Generated class for the TextImgComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'text-img',
  templateUrl: 'text-img.html'
})
export class TextImg {

  //text: string;
  COLORS: any[] = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
    '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#d4e157', '#673ab7',
    '#ffb74d', '#a1887f', '#90a4ae'];

  constructor(private element: ElementRef) { }

  @Input()
  set text(txt: string) {
    this.element.nativeElement.style.backgroundColor = this.getColor(txt);
    this.element.nativeElement.setAttribute("value", txt);
  }

  getColor(str: string): string {
    return this.COLORS[Math.abs(this.generateHashCode(str)) % this.COLORS.length];
  }

  generateHashCode(str: string): number {
    let h = 0;
    if (str.length > 0) {
      for (let i = 0; i < str.length; i++) {
        h = 31 * h + str.charCodeAt(i);
        h |= 0; // Convert to 32bit integer
      }
    }
    return h;
  };

}
