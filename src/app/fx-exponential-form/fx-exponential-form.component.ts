import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rf-fx-exponential-form',
  templateUrl: './fx-exponential-form.component.html',
  styleUrls: ['./fx-exponential-form.component.scss']
})
export class FxExponentialFormComponent {

  @Input() form: FormGroup;

}
