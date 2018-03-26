import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadImage: File;
  temporalImage: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) {  }

  ngOnInit() {
  }

  closeModal() {
    this.uploadImage = null;
    this.temporalImage = null;

    this._modalUploadService.toHideModal();
  }

  toUploadImage() {
    this._uploadFileService.uploadFiles ( this.uploadImage, this._modalUploadService.type, this._modalUploadService.id)
        .then( response => {
          // console.log( response );
          this._modalUploadService.notification.emit( response );
          this.closeModal();
        })
        .catch( response => {
          console.log('Error en la carga de imagen');
        });
  }

  imageSelected( file: File ) {

    if ( !file ) {
      this.uploadImage = null;
      return;
    }

    // console.log(file);

    if ( file.type.indexOf('image') < 0 ) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.uploadImage = null;
      return;
    }


    this.uploadImage = file;

    const reader = new FileReader();
    const temporalUrlImage = reader.readAsDataURL( file );

    reader.onloadend = () => {
      // console.log( reader.result );
      this.temporalImage = reader.result;
    };

  }


}
