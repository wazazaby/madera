import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  constructor() { }

  public columns = {
    id: {
      title: 'ID',
      type: 'number',
    },
    firstName: {
      title: 'First Name',
      type: 'string',
    },
    lastName: {
      title: 'Last Name',
      type: 'string',
    },
    username: {
      title: 'Username',
      type: 'string',
    },
    email: {
      title: 'E-mail',
      type: 'string',
    },
    age: {
      title: 'Age',
      type: 'number',
    },
  };

  public data = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mdo',
    email: 'mdo@gmail.com',
    age: '28',
  }, {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
    email: 'fat@yandex.ru',
    age: '45',
  }, {
    id: 3,
    firstName: 'Larry',
    lastName: 'Bird',
    username: '@twitter',
    email: 'twitter@outlook.com',
    age: '18',
  }, {
    id: 4,
    firstName: 'John',
    lastName: 'Snow',
    username: '@snow',
    email: 'snow@gmail.com',
    age: '20',
  }];

  ngOnInit(): void {

  }

  onCreate($event: any) {
    console.log('*evt onCreate user', $event);
  }

  onEdit($event: any) {
    console.log('*evt onEdit user', $event);
  }

  onDelete($event: any) {
    console.log('*evt onDelete user', $event);
  }
}
