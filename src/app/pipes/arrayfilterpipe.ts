import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the Arrayfilterpipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'devotionFilter',
  pure: false
})
@Injectable()
export class ArrayFilterPipe implements PipeTransform  {
  /*
    Takes a value and makes it lowercase.
   */
  transform(items:any[], params: string) {
     //console.log(params);
    if(items == null || items.constructor !== Array) { return null; }
    let query = params.toLowerCase();
    return items.filter((item) => {
      var haystack = JSON.stringify(item);
      // console.log(haystack.toLowerCase().indexOf(query));
      // console.log(haystack);
      return (haystack.toLowerCase().indexOf(query) > -1);
    });
  }
}
