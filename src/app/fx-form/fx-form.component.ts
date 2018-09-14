import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ComplexityCheckerService } from '../complexity-checker.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rf-fx-form',
  templateUrl: './fx-form.component.html',
  styleUrls: ['./fx-form.component.scss']
})
export class FxFormComponent implements OnInit {

  form: FormGroup;

  constructor(private checker: ComplexityCheckerService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z]+$/)
      ]),
      description: new FormControl(null, {
        asyncValidators: (c) => c.value ? this.checker.checkComplexityOkay(c.value).pipe(
          map(okay => okay ? null : { too_complex: true })
        ) : of(null)
      })
    });
  }

  debug() {
    console.log(this.form.value);
  }

  example() {
    this.form.setValue({
      name: 'foo',
      description: 'an example function'
    });
  }
}
