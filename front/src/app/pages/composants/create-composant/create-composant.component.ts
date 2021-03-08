import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-create-composant',
  templateUrl: './create-composant.component.html',
  styleUrls: ['./create-composant.component.scss']
})
export class CreateComposantComponent implements OnInit {
    @Input() title: string;
  constructor(
    private _formBuild: FormBuilder
  ) { }

  public formUser: FormGroup = this._formBuild.group({
    label: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required]),
    shortDescription: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
  });

  ngOnInit(): void {
  }

}
