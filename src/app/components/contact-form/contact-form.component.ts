import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public user: FormGroup;
  constructor(protected fb: FormBuilder, protected profileService: ProfileService, protected router: Router) {
    const currentUser = profileService.user;
      this.user = fb.group({
          name: [currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '',  Validators.required],
          email: [currentUser ? `${currentUser.email}` : '', Validators.required],
          phone: [currentUser ? `${currentUser.phone}` : '',  Validators.required],
          message: ['']
      });
  }
  ngOnInit() {
  }

  onSubmit(event) {
  }
}
