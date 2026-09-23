import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alien-mark',
  templateUrl: './alien-mark.html',
})
export class AlienMark {
  readonly large = input(false);
}
