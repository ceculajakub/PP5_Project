import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlaylistsDetailsComponent } from './components/playlists-details/playlists-details.component';
import { PlaylistsEditorComponent } from './components/playlists-editor/playlists-editor.component';
import { PlaylistsListComponent } from './components/playlists-list/playlists-list.component';
import { PlaylistsViewComponent } from './containers/playlists-view/playlists-view.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';


@NgModule({
  declarations: [    
    PlaylistsComponent,
    PlaylistsViewComponent,
    PlaylistsListComponent,
    PlaylistsDetailsComponent,
    PlaylistsEditorComponent],
  imports: [
    SharedModule,
    PlaylistsRoutingModule
  ]
})
export class PlaylistsModule { }
