import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss']
})
export class UserInfoFormComponent implements OnInit {

  public userInfo: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.userInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      streetName: [''],
      streetNumber: [''],
      buildingNumber: [''],
      buildingEntrance: [''],
      buildingAppartment: [''],
      buildingFloor: ['']
    });
  }

  ngOnInit() {
  }

}
