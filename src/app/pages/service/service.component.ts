import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services/services.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: []
})
export class ServiceComponent implements OnInit {

  service: Service = new Service('', '', '', 0);

  constructor(
    public _servicesService: ServicesService,
    public _userService: UserService
  ) { }

  ngOnInit() {
  }

  createNewService( form: NgForm ) {

    // console.log('Pasamos por el crear nuevo servicio');
    // let isActive = true;

    if (form.invalid) {
      console.log('El formulario es invalido');
      console.log(form);
      return;
    }

    // if (this.areActive[0] === 'no') {
    //   isActive = false;
    // } else {
    //   isActive = true;
    // }

    console.log(`El formulario es: ${form.valid}`);
    console.log(form.value);
    console.log(form.value.price);
    console.log(form.value.name);
    console.log(form.value.description);

    this.service.professional = this._userService.user._id;
    this.service.name = form.value.name;
    this.service.description = form.value.description;
    this.service.price = form.value.price;

    console.log('El servicio es:');
    console.log( this.service );
    this._servicesService.createNewService(this.service)
        .subscribe( (response: any) => {
          console.log('La respuesta del servidor al crear el servicio es');
          console.log(response);
        });
  }

}
