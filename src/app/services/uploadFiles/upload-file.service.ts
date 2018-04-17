import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() { }

  uploadFiles( file: File, type: string, id: string ) {

    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const ajaxResponse = new XMLHttpRequest();

      formData.append('image', file, file.name);

      ajaxResponse.onreadystatechange = () => {
        if ( ajaxResponse.readyState === 4 ) {
          if ( ajaxResponse.status === 200 ) {
            console.log('Imagen subida');
            resolve( JSON.parse( ajaxResponse.response ));
          } else {
            // console.log('Fallo la subida');
            // console.log(ajaxResponse.response);
            reject( ajaxResponse.response );
          }
        }
      };

      const url = URL_SERVICES + '/uploads/' + type + '/' + id;
      // console.log('URL en upload-file');
      // console.log(url);

      // console.log( formData );

      ajaxResponse.open('PUT', url, true);
      ajaxResponse.send( formData );
    });

  }



}
