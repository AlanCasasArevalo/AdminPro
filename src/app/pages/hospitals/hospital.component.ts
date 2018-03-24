import { Component, OnInit } from "@angular/core";
import { Hospital } from '../../models/hospital.model';
import { User } from "../../models/user.model";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";
import { HospitalService } from "../../services/hospital/hospital.service";

declare var swal: any;

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styles: []
})
export class HospitalComponent implements OnInit {
  totalHospitals: number = 0;
  loading: boolean = true;
  hospitals: Hospital[] = [];
  from: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe(response =>
      this.loadHospitals()
    );
  }

  loadHospitals() {
    this.loading = true;
    this._hospitalService
      .loadHospitalsFromServer(this.from)
      .subscribe((response: any) => {
        // console.log(response);
        this.totalHospitals = response.total;
        this.hospitals = response.hospitals;
        // console.log(this.users);
        this.loading = false;
      });
  }

  searchHospital(hospitalToSearch: string) {
    // console.log(value);
    this.loading = true;

    if (hospitalToSearch.length <= 0) {
      this.loadHospitals();
      return;
    }

    this._hospitalService
      .searchHospitalsFromServer(hospitalToSearch)
      .subscribe((hospitalFromServer: Hospital[]) => {
        // console.log(hospitalFromServer);
        this.hospitals = hospitalFromServer;
        this.loading = false;
      });
  }

  hospitalToDelete(hospitalToDelete: Hospital) {
    // console.log(hospitalToDelete);
    swal({
      title: '¿Estas seguro?',
      text: 'Estas a punto de borrar a ' + hospitalToDelete.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      // console.log(willDelete);
      if (willDelete) {
        this._hospitalService
          .deleteHospitalFromService(hospitalToDelete._id)
          .subscribe(deleted => {
            // console.log( deleted );
            this.loadHospitals();
          });
      }
    });
  }

  updateHospitalImage(hospital: Hospital) {
    this._modalUploadService.toShowModal('hospitals', hospital._id);
  }

  updateHospital(hospitalToUpdate: Hospital) {
    this._hospitalService.updateHospital(hospitalToUpdate).subscribe();
  }

  changeFrom(value: number) {
    const from = this.from + value;
    // console.log( from );

    if (from >= this.totalHospitals || from < 0) {
      return;
    }

    this.from += value;
    this.loadHospitals();
  }

  createNewHospital() {
    swal({
      title: 'Crear nuevo hospital',
      text: 'Ingrese el nombre del hospital que quiere crear',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((value: string) => {
      // console.log(`El valor de value es: ${value}`);

      if (!value || value.length === 0) {
        return;
      }

      this._hospitalService
        .createNewHospital(value)
        .subscribe(() => this.loadHospitals());
    });
  }
}
