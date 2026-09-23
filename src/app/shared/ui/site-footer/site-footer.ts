import { Component } from '@angular/core';
import { AlienMark } from '../alien-mark/alien-mark';
import { Reveal } from '../reveal/reveal';

@Component({
  selector: 'app-site-footer',
  imports: [AlienMark, Reveal],
  templateUrl: './site-footer.html',
})
export class SiteFooter {}
