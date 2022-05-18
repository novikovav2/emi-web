import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'humanView'
})
export class TextTransformPipe implements PipeTransform {
  transform(value?: string | boolean): string {
    let result
    switch (value) {
      case 'OPTIC':
        result = 'Оптика'
        break
      case 'COPPER':
        result = 'Медь'
        break
      case true:
        result = 'Да'
        break
      case false:
        result = 'Нет'
        break
      default:
        result = ''
        break
    }
    return result
  }
}
