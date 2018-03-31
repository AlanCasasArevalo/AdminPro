import { Component, OnInit } from '@angular/core';

import { Appoitment } from '../../models/appoitment.model';

import { AppointmentsService } from '../../services/appointments/appointments.service';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styles: []
})
export class AppointmentsComponent implements OnInit {

  appoitments: Appoitment[] = [];
  loading: boolean = true;
  totalAppoitments: number = 0;

  constructor(
    public _appoitmentsServices: AppointmentsService,
    public _userServices: UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadAppoitments();
  }

  loadAppoitments() {
    this.loading = true;
    this._appoitmentsServices.loadAppoitmentsFromServer()
        .subscribe( (response: any) => {
          console.log('Respuesta al recibir las citas desde el servidor');
          console.log(response);
          this.totalAppoitments = response.result.rows.length;
          this.appoitments = response.result.rows;
          this.loading = false;
        });
      }

}
