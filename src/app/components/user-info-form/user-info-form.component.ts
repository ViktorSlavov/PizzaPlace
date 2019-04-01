import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss']
})
export class UserInfoFormComponent implements OnInit, OnDestroy {

  public userInfo: FormGroup;
  protected _destroy$: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
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
    this.profileService.getUser().subscribe(userData => {
      this.userInfo.patchValue({
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        phone: userData.phone
      });
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
