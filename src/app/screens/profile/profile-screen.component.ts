import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Observable } from 'rxjs';
import { Order } from '../../common/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfilePageComponent implements OnInit {


  public previousOrders: Observable<Order>;
  constructor(protected profileService: ProfileService) {}

  ngOnInit() {
  }
}
