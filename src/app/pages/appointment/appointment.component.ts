import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { UserService } from '../../services/user/user.service';
import { ServicesService } from '../../services/services/services.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments/appointments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styles: []
})
export class AppointmentComponent implements OnInit {

  services: Service[] = [];
  loading: boolean = true;
  totalAppoitments: number = 0;
  service: Service = new Service('');
  appointment: Appointment = new Appointment();

  constructor(
    public _servicesService: ServicesService,
    public _userServices: UserService,
    public _appointmentServices: AppointmentsService,
    public _modalUploadService: ModalUploadService,
    public _activateRoute: ActivatedRoute,
    public router: Router,
  ) {
    _activateRoute.params.subscribe( params => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadAppointmentByID( id );
      }
    });
  }

  ngOnInit() {
    this._servicesService.loadServicesFromServer()
        .subscribe( (response: any) => {
          this.services = response.result.rows;
          // console.log('Respuesta al pedir los servicios al servidor desde citas');
          // console.log(this.services);
        });
  }


  serviceChanged( id: string ) {
    // console.log('Id del servicio en citas');
    // console.log(id);
    this._servicesService.loadServiceByID(id)
        .subscribe( (service: any) => {
          // console.log('Respuesta del servicio al pedir por ID');
          // console.log(service);
          this.service = service;
        });
  }

  loadAppointmentByID ( id: string ) {
    this._appointmentServices.loadAppointmentByID(id)
        .subscribe( appointment => {
          // console.log('Respuesta al pedir la cita por ID');
          // console.log(appointment);
          this.appointment = appointment;
          this.appointment.service = appointment.service._id;
          this.serviceChanged(this.appointment.service);
        });
  }

  saveAppointment(form: NgForm) {
    // console.log('Datos del formulario');
    // console.log(form.valid);
    // console.log(form.value);
    if (form.invalid) {
      console.log('El formulario es invalido');
      return;
    }

    const date = new Date();
    this.appointment.date = date;
    this.appointment.isCancelled = false;
    this.appointment.isConfirmed = false;
    this.appointment.customer = this._userServices.user._id;
    this.appointment.professional = '5ac88b683cb34b07e677afca';

    this._appointmentServices.createOrUploadAppointment( this.appointment )
        .subscribe( (appointment: any) => {
          console.log('Respuesta al crear la cita ');
          console.log(appointment);

          this.router.navigate(['/appointment', appointment._id]);

        });

  }

}
