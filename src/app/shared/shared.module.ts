import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ClockComponent } from './components/clock/clock.component';
import { CensorDirective } from './validators/censor.directive';

export const MaterialImports = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatCardModule,
  CdkMenuModule
]

export const SharedImports = [
  CommonModule,
  FormsModule
]

export const SharedDeclarations = [
  ClockComponent,
  CensorDirective
]

@NgModule({
  declarations: [
    SharedDeclarations
  ],
  imports: [
    MaterialImports,
    SharedImports
  ],
  exports: [
    SharedDeclarations,
    SharedImports,
    MaterialImports
  ]
})
export class SharedModule { 
  constructor()
  {
    
  }
}
