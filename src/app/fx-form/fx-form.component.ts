import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ComplexityCheckerService } from '../complexity-checker.service';
import { map } from 'rxjs/operators';

export function numeric(c: AbstractControl): ValidationErrors | null {
  if (c.value) {
    const text = c.value as string;
    if (isNaN(parseInt(text, 10))) {
      return {
        'not_an_integer': true
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
}

class MathFunction {
  constructor(
    readonly name: string,
    readonly slope: number,
    readonly constant: number) {}

  compute(x) {
    return this.constant + this.slope * x;
  }
}


@Component({
  selector: 'rf-fx-form',
  templateUrl: './fx-form.component.html',
  styleUrls: ['./fx-form.component.scss']
})
export class FxFormComponent implements OnInit {

  form: FormGroup;
  func: MathFunction = null;

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
      }),
      type: new FormControl('linear'),

      constant: new FormControl('0', [Validators.required, numeric]),
      slope: new FormControl('1', [Validators.required, numeric]),

      base: new FormControl('1', [Validators.required, numeric])
    })
    ;
  }

  get type() {
    return this.form.get('type').value;
  }

  debug() {
    console.log(this.form.value);
  }

  example() {
    this.form.setValue({
      name: 'foo',
      description: 'an example function',
      type: 'linear',
      slope: '23',
      constant: '5',
      base: '1'
    });
  }

  createFunction() {
    this.func = new MathFunction(this.form.value.name,
      parseInt(this.form.value.slope, 10),
      parseInt(this.form.value.constant, 10)
    );
  }
}
