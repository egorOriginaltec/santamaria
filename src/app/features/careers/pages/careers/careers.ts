import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CareersForm } from '../../components/careers-form/careers-form';

@Component({
  selector: 'app-careers',
  imports: [CareersForm],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPage {}
