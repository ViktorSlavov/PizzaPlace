import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingComponent } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from 'src/app/components/menu-item/menu-item.component';
import { IgxButtonModule, IgxCardModule, IgxInputGroupModule, IgxCheckboxModule, IgxIconModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { FilterPipesModule } from 'src/app/pipes/filter-pipes.module';
import { ImagePipeModule } from 'src/app/pipes/image-pipe.module';
import { MenuItemDetailsComponent } from 'src/app/components/menu-item-details/menu-item-details.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingComponent,
    FormsModule,
    IgxButtonModule,
    IgxCardModule,
    IgxInputGroupModule,
    IgxCheckboxModule,
    IgxIconModule,
    FilterPipesModule,
    ImagePipeModule
  ],
  declarations: [MenuComponent, MenuItemComponent, MenuItemDetailsComponent]
})
export class MenuModule { }
