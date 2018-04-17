import { Component, OnInit } from '@angular/core';

import { AppointmentsService } from '../../services/appointments/appointments.service';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import swal from 'sweetalert2';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styles: []
})

export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading: boolean = true;
  totalAppointments: number = 0;

  constructor(
    public _appointmentsServices: AppointmentsService,
    public _userServices: UserService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadAppointments();
    this._modalUploadService.notification.subscribe((response: any) => {
      this.loadAppointments();
    });
  }

  loadAppointments() {
    this.loading = true;

    if (this._userServices.user.isProfessional) {
      this._appointmentsServices
        .loadProfessionalAppointmentsFromServer()
        .subscribe((response: any) => {
          console.log(
            'Respuesta al recibir las citas desde el servidor para profesionales'
          );
          console.log(response);
          this.totalAppointments = response.result.rows.length;
          this.appointments = response.result.rows;
          this.loading = false;
        });
    } else {
      this._appointmentsServices
        .loadCustomerAppointmentsFromServer()
        .subscribe((response: any) => {
          console.log('Respuesta al recibir las citas desde el servidor');
          console.log(response);
          this.totalAppointments = response.result.rows.length;
          this.appointments = response.result.rows;
          this.loading = false;
        });
    }
  }

  toShowModal(appointmentID: string) {
    this._modalUploadService.toShowModal('appointment', appointmentID);
  }

  appointmentToDelete(appointment: Appointment) {
    swal({
      title: '¿Seguro que quieres borrar?',
      text: `Vas a borrar ${appointment}`,
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
    }).then(result => {
      if (result.value) {
        this._appointmentsServices
          .deleteService(appointment._id)
          .subscribe(deleted => {
            // swal('Borrado', `${appointment.name} ha sido borrado`, 'success');
            console.log('Al borrar:');
            console.log(deleted);
            this.loadAppointments();
          });
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal('Cancelado', 'Tu servicio esta a salvo 😊', 'error');
      }
    });
  }
}
