import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public type: string;
  public id: string;

  public hide: string = 'hide';

  public notification = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload ready');
  }

  toHideModal() {
    this.hide = 'hide';
    this.type = null;
    this.id = null;
  }

  toShowModal( type: string, id: string) {
    this.id = id;
    this.type = type;
    this.hide = '';
  }

}
