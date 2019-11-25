import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metrica'
})
export class MetricaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if(value === undefined){
      return '0 m';
    }

    if (value >= 1000) {
      return (value / 1000).toFixed(2) + ' km';
    } else {
      return value + ' m';
    }

  }

}
