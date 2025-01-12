import { NgModule } from '@angular/core';
import { SongsRoutingModule } from './songs-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    SongsRoutingModule
  ]
})
export class SongsModule { }
