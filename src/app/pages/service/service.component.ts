import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services/services.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: []
})
export class ServiceComponent implements OnInit {

  service: Service = new Service('', '', '', 0);

  constructor(
    public _servicesService: ServicesService,
    public _userService: UserService,
    public router: Router,
    public activateRoute: ActivatedRoute,
  ) { 
    activateRoute.params.subscribe( params => {
      // console.log('Parametros recibidos ID del service');
      // console.log( params );
      const id = params['id'];
      if (id !== 'new') {
        this.loadServiceByID( id );
      }
    });
  }

  ngOnInit() {
  }

  createNewAndUpdateService ( form: NgForm ) {
    if (form.invalid) {
      console.log('El formulario es invalido');
      console.log(form);
      return;
    }

    // console.log('El Service es:');
    // console.log( this.Service );
    this._servicesService.createOrUploadService(this.service)
        .subscribe( (service: any) => {
          console.log('La respuesta del servidor al crear el service es');
          console.log(service);
          this.service._id = service._id;

          console.log('El id del Service es');
          console.log(service._id);

          this.router.navigate(['/service', service._id]);

        });

  }

  loadServiceByID(id: string) {
    // console.log('Service en component.ts Service');
    this._servicesService.loadServiceByID( id )
        .subscribe( service => {
          // console.log('Service devuelto desde el servidor');
          // console.log(Service);
          this.service = service;
        });
  }

}
