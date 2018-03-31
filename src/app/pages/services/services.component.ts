import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services/services.service';

import { Service } from '../../models/service.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {

  services: Service[] = [];
  loading: boolean = true;
  totalServices: number = 0;

  constructor(
    public _servicesService: ServicesService,
    public _userServices: UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadServices();
    this._modalUploadService.notification
        .subscribe((response: any) => {
          this.loadServices();
        });
  }

  loadServices() {
    this.loading = true;
    this._servicesService.loadServicesFromServer()
        .subscribe( (response: any) => {
          // console.log('Respuesta al recibir los servicios desde el servidor');
          // console.log(response.result.rows);
          this.totalServices = response.result.rows.length;
          this.services = response.result.rows;
          this.loading = false;
        });
  }

  toShowModal( serviceID: string ) {
    // console.log(this._modalUploadService.toShowModal('services', serviceID));
    this._modalUploadService.toShowModal( 'services', serviceID );
  }

  // createNewService() {
  //   swal.setDefaults({
  //     input: 'text',
  //     confirmButtonText: 'Next &rarr;',
  //     showCancelButton: true,
  //     progressSteps: ['1', '2', '3', '4']
  //   });
  //   const steps = [
  //     { title: 'Nombre', text: 'Necesitamos un nombre que mostrar al usuario' },
  //     { title: 'Descripción', text: 'Necesitamos una descripción que mostrar al usuario' },
  //     { title: 'Precio', text: 'Necesitamos un precio que mostrar al usuario' },
  //     { title: '¿Esta activo?', text: 'Solo diganos un si o un no por favor' },
  //   ];
  //   swal.queue(steps).then((result) => {
  //     swal.resetDefaults();

  //     if (result.value) {
  //       const name: string = result.value[0];
  //       const description: string = result.value[1];
  //       const price: number = result.value[2];
  //       const isActiveString: string = result.value[3];
  //       let isActive = true;

  //       if (
  //         (name && name.length <= 0) ||
  //         (description && description.length <= 0) ||
  //         (price && price <= 0) ||
  //         ( isActiveString.toLowerCase() === 'si' || isActiveString.toLowerCase() === 'no' )
  //       ) {
  //         if (isActiveString === 'no') {
  //           isActive = false;
  //         }

  //         const service = new Service(
  //           this._userServices.user._id,
  //           name, description, price, isActive
  //         );

  //         console.log('Llamando a crear nuevo producto');
  //         console.log(service);
  //         this._servicesService.createNewService(service);

  //         swal({
  //           title: 'Genial se creo el producto OK',
  //           confirmButtonText: 'Genial!'
  //         });
  //       } else {
  //         swal({
  //           type: 'error',
  //           title: 'Oops...',
  //           text: 'Alguno de los campos no fue rellenado correctamente'
  //           });
  //       }
  //     }
  //   });
  // }

  updateService(service: Service ) {

  }

  serviceToDelete (service: Service ) {

  }
}
