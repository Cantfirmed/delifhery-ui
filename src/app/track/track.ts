import { Component } from '@angular/core';
import { TrackForm } from './track-form/track-form';

@Component({
  selector: 'app-track',
  imports: [TrackForm],
  templateUrl: './track.html',
  styleUrl: './track.css',
})
export class Track {}
