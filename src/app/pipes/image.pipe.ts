import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( image: string, type: string = 'users' ): any {

    let url = URL_SERVICES + '/images';

    // console.log('carga de imagenes en Pipe');
    // console.log( url );

    if ( !image ) {
      return url + '/users/xxx';
    }

    if ( image.indexOf( 'https' ) >= 0 ) {
      return image;
    }

    switch ( type ) {
      case 'users':
          url += '/users/' + image;
      break;

      case 'products':
          url += '/products/' + image;
      break;

      case 'blogs':
          url += '/blogs/' + image;
      break;

      default:
        console.log('El tipo de imagen no existe ');
        url += '/users/xxx';
    }

    return url;
  }

}
