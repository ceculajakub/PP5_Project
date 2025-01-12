import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors, Validator
} from '@angular/forms';

@Directive({
  selector: '[ngModel][appCensor]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CensorDirective,
    multi: true // MultiToken  InjectionToken< T[] > 
  }]
})
export class CensorDirective implements Validator {

  @Input('appCensor') badword = '';

  validate(control: AbstractControl): ValidationErrors | null {
    const badword = this.badword;

    return String(control.value).includes(badword) ? {
      'censor': { badword }
    } : null;
  }

  onBadwordChanged?: Function

  ngOnChanges(): void {
    this.onBadwordChanged?.()
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onBadwordChanged = fn
  }
}


// interface CzymJaBedeWJavascripcie { } // Znika!

// S.O.L.I.D 