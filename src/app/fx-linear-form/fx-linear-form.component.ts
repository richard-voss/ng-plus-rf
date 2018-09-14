import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rf-fx-linear-form',
  templateUrl: './fx-linear-form.component.html',
  styleUrls: ['./fx-linear-form.component.scss']
})
export class FxLinearFormComponent {

  @Input() form: FormGroup;
}
