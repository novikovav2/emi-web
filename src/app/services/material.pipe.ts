import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'humanView'
})
export class MaterialPipe implements PipeTransform {
  transform(value?: string): string {
    return value === 'OPTIC' ? 'Оптика' : 'Медь'
  }
}
