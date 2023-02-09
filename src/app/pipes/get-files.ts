import { Pipe, PipeTransform } from '@angular/core';
import {  URL_BASE } from 'src/environments/environment';

@Pipe({
  name: 'Imagen'
})
export class GetImagen implements PipeTransform {

  transform(img: string, contoller: string): string {
    if (img === null || img === undefined) {
      return 'https://via.placeholder.com/30x30';
    }
    let urlImg:string = `${URL_BASE}${contoller}${img}`;
    return urlImg;
  }

}