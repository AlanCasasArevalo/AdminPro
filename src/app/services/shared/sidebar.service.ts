import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {


  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress' },
        { title: 'Graphics', url: '/graphics1' },
        { title: 'Promise', url: '/promise' },
        { title: 'RXJS', url: '/rxjs' },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Users', url: '/users' },
        { title: 'Hospitals', url: '/hospitals' },
        { title: 'Doctors', url: '/doctors' }
      ]
    }
  ];

  constructor() { }

}
