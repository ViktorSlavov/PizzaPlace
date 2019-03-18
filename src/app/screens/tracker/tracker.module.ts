import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerRouterModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { TimelineItemComponent } from 'src/app/components/timeline-item/timeline-item.component';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';

@NgModule({
  imports: [
    CommonModule,
    TrackerRouterModule
  ],
  declarations: [TrackerComponent, TimelineComponent, TimelineItemComponent, TimelinePipe]
})
export class TrackerModule { }
