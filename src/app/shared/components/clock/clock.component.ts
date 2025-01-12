import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `<span>{{time}}</span>`
})
export class ClockComponent {
 time = (new Date()).toLocaleTimeString();

 constructor(private zone: NgZone, private changeDetectionRef: ChangeDetectorRef)
 {
 }

 ngOnInit(): void {

  this.zone.runOutsideAngular(() => {
    setInterval(() => {
      this.time = (new Date()).toLocaleTimeString()

      this.changeDetectionRef.detectChanges()

    }, 1_000)
  })

}

}
