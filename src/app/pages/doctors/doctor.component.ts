import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public _activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
  ) {
    _activateRoute.params.subscribe( params => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadDoctor( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.loadHospitalsFromServer()
        .subscribe( (response: any) => {
          // console.log(response.hospitals);
          this.hospitals = response.hospitals;
        });

    this._modalUploadService.notification
        .subscribe( (response: any) => {
          // console.log(response);
          this.doctor.img = response.Doctor.img;
        });
  }

  saveDoctor(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }

    this._doctorService.saveADoctor( this.doctor )
        .subscribe( (doctor: any) => {

          this.doctor._id = doctor._id;
          // console.log(doctor);

          this._router.navigate(['/doctor', doctor._id]);

        });

  }

  hospitalChanged( id: string ) {
    // console.log( id );
    console.log(id);
    this._hospitalService.getHospitalById(id)
        .subscribe( (hospital: any) => {
          // console.log(hospital);
          this.hospital = hospital;
        });
  }

  loadDoctor( id: string) {
    this._doctorService.loadDoctorById(id)
        .subscribe( doctor => {
          // console.log(doctor);
          this.doctor = doctor;
          this.doctor.hospital = doctor.hospital._id;
          this.hospitalChanged(this.doctor.hospital);
        });
  }

  changeImage() {
    this._modalUploadService.toShowModal('doctors', this.doctor._id);
  }
}
