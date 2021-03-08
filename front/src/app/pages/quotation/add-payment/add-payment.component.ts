import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {

  @Input() title: string;
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
