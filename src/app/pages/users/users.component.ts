import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  from: number = 0;
  totalUsers: number = 0;
  loading: boolean = true;

  constructor(public _userService: UserService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification
        .subscribe( response => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this._userService
      .loadUsersFromServer()
      .subscribe((response: any) => {
        console.log(response.result.rows);
        this.totalUsers = response.result.rows.length;
        this.users = response.result.rows;
        console.log(this.users);
        this.loading = false;
      });
  }

  changeFrom(value: number) {

    const from = this.from + value;
    // console.log( from );

    if ( from >= this.totalUsers || from < 0) {
      return;
    }

    this.from += value;
    this.loadUsers();

  }

  searchUser( userToSearch: string ) {
    // console.log( userToSearch );
    this.loading = true;

    if (userToSearch.length <= 0) {
      this.loadUsers();
      return;
    }

    this._userService.searchUsersFromServer( userToSearch )
            .subscribe( (usersFromServer: User[]) => {
              // console.log(usersFromServer);
              this.users = usersFromServer;
              this.loading = false;
            });
  }

  userToDelete( userToDelete: User ) {
    console.log('Usuario a borrar');
    console.log(userToDelete);
    // Si el user es el mismo que el user a borrar no se borra
    // TODO: hacer que solo un admin pueda borrar
    if ( userToDelete._id === this._userService.user._id ) {
      swal('No se puede borrar', 'No te puedes borrar a ti mismo', 'error');
      return;
    }

    swal('Has borrado', 'Borraste al usuario ' + userToDelete.name , 'success' )
    .then( willDelete  => {
      // console.log(willDelete);
      if ( willDelete ) {
        this._userService.deleteUserFromService(userToDelete._id)
            .subscribe( deleted => {
              console.log('Al borrar:');
              console.log( deleted );
              this.loadUsers();
            });
      }

    });
  }

  updateUser(userToUpdate: User) {
    this._userService.updateUser( userToUpdate )
        .subscribe();
  }

  toShowModal( userId: string ) {
    // console.log(this._modalUploadService.toShowModal('users', userId));
    this._modalUploadService.toShowModal( 'users', userId );
  }
}
