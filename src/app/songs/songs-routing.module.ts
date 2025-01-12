import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongSearchComponent } from './components/song-search/song-search.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongUploadComponent } from './components/song-upload/song-upload.component';

const routes: Routes = [
  { path: 'search', component: SongSearchComponent },
  { path: 'list', component: SongListComponent },
  { path: 'upload', component: SongUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
