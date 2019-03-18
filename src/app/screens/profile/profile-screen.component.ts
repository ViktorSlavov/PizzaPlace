import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(protected profileService: ProfileService) { }

  ngOnInit() {
  }

}
