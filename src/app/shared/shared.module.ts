import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { MapsComponent } from './modules/maps/maps.component';
 

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AgmCoreModule
  ],
  providers: [
    GoogleMapsAPIWrapper,
  ],
  declarations: [
    MapsComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    MapsComponent
  ],
  entryComponents: [
  ]
})
export class SharedModule {}
