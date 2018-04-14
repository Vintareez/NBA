import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {
  transform(array: any, index?: any, size?: any): any {
    let  start, end;
    if (array == null) return array; 

    (index === 0) ? start = index : start = index * size;
    end = start + size;
    return array.slice(start, end);
  }
}