import { NgModule } from '@angular/core';
import { TextFilterPipe } from './text-filter.pipe';
import { CategoryFilterPipe } from './category-filter.pipe';
import { TypeFilterPipe } from './type-filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [TextFilterPipe, CategoryFilterPipe, TypeFilterPipe],
    declarations: [TextFilterPipe, CategoryFilterPipe, TypeFilterPipe]
})
export class FilterPipesModule {
}
