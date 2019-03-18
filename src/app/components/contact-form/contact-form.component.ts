import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public user: FormGroup;
  constructor(fb: FormBuilder) {
      this.user = fb.group({
          name: ['',  Validators.required],
          email: ['', Validators.required],
          phone: ['',  Validators.required],
          message: ['']
      });
  }
  ngOnInit() {
  }

  onSubmit(event) {
    console.log(event);
  }
}
