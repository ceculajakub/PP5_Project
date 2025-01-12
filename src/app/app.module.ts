import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from "./core/layout/navigation/navigation.component";
import { SharedModule } from './shared/shared.module';
import { SongsModule } from './songs/songs.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NavigationComponent,
    SongsModule
],
  providers: [],
  bootstrap: []
})
export class AppModule { }
