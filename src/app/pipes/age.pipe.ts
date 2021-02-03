import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(input: number): any {
    const dateNow = new Date();
    const inputDate = new Date(input);
    if (inputDate.getMonth() > dateNow.getMonth() && inputDate.getDay() > dateNow.getDay()){
      return dateNow.getFullYear() - inputDate.getFullYear();
    }
    else {
      return dateNow.getFullYear() - inputDate.getFullYear() - 1;
    }
  }

}
