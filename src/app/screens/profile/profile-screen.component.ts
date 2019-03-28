import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user: FormGroup;

  constructor(protected profileService: ProfileService, protected formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({

    });
  }

  ngOnInit() {
  }

}
