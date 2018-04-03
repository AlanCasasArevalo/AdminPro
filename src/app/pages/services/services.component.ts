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

  serviceToDelete (service: Service ) {

    swal({
      title: '¿Seguro que quieres borrar?',
      text: `Vas a borrar ${ service.name }` ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._servicesService.deleteService(service._id)
        .subscribe( deleted => {
          swal('Borrado', `${service.name} ha sido borrado`, 'success');
          console.log('Al borrar:');
          console.log( deleted );
          this.loadServices();
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Cancelado',
          'Tu servicio esta a salvo 😊',
          'error'
        );
      }
    });
  }
}
