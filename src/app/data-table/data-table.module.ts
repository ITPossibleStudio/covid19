import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    DataTableComponent
  ]
})

export class DataTableModule {

}
