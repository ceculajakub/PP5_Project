import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Playlist } from '@/playlists/containers/playlists-view/Playlist';
import { NgForm, NgModel } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

@Component({
  selector: 'app-playlists-editor',
  templateUrl: './playlists-editor.component.html',
  styleUrl: './playlists-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // d|-_-|b
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        color: 'accent',
      } satisfies MatFormFieldDefaultOptions,
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class PlaylistsEditorComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Playlist>();

  @Input() playlist?: Playlist = {
    id: '',
    name: '',
    description: '',
    public: false,
  };

  @ViewChild('nameModelRef', { read: NgModel, static: false })
  nameModelRef?: NgModel;

  @ViewChild('formRef')
  formRef?: NgForm;

  onCancel() {
    this.cancel.emit();
  }
  onSave() {
    const draft = {
      ...this.playlist,
      ...this.formRef?.value,
    };
    this.save.emit(draft);
  }
}
