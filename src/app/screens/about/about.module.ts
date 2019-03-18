import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { IgxInputGroupModule, IgxButtonModule, IgxIconModule } from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    ReactiveFormsModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxIconModule
  ],
  declarations: [AboutComponent, ContactFormComponent]
})
export class AboutModule { }
