import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  loading: boolean = false;
  from: number = 0;
  totalDoctors: number = 0;

  constructor(
    public _doctorsService: DoctorService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadDoctors();
    this._modalUploadService.notification.subscribe(response =>
      this.loadDoctors());
  }

  loadDoctors () {
    this.loading = true;
    this._doctorsService.loadDoctorsFromServer(this.from)
        .subscribe( (doctors: any) => {
          console.log(doctors);
          // this.totalDoctors = doctors.length;
          this.doctors = doctors;
          this.loading = false;
        });
  }

  searchDoctor(value) {
    this._doctorsService.searchDoctorFromServer(value)
        .subscribe( (response: any) => this.doctors = response);
  }

  doctorToDelete(doctorToDelete) {
    this._doctorsService.deleteDoctor( doctorToDelete._id )
        .subscribe(() => this.loadDoctors());
  }

  changeFrom(value: number) {
    const from = this.from + value;
    console.log( from );

    if (from >= this._doctorsService.totalDoctors || from < 0) {
      return;
    }

    this.from += value;
    this.loadDoctors();
  }

}
