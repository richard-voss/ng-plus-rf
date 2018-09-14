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

abstract class MathFunction {
  constructor(
    readonly name: string) {}

  abstract compute(x: number): number;
}

class LinearFunction extends MathFunction {
  constructor(name: string,
    readonly slope: number,
    readonly constant: number) {
    super(name);
  }

  compute(x: number): number {
    return this.constant + this.slope * x;
  }
}

class ExponentialFunction extends MathFunction {

  constructor(name: string, readonly base: number) {
    super(name);
  }

  compute(x: number): number {
    return Math.pow(this.base, x);
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
      type: new FormControl('linear')
    });

    this.form.get('type').valueChanges.subscribe(type => this.typeChanged(type));
    this.typeChanged('linear');
  }

  private typeChanged(type) {


    if (type === 'linear') {
      this.form.addControl('constant', new FormControl('0', [Validators.required, numeric]));
      this.form.addControl('slope', new FormControl('1', [Validators.required, numeric]));
      this.form.removeControl('base');
    } else {
      this.form.removeControl('constant');
      this.form.removeControl('slope');
      this.form.addControl('base', new FormControl('1', [Validators.required, numeric]));
    }
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
      constant: '5'
    });
  }

  createFunction() {
    this.func = this.type === 'linear' ?
      new LinearFunction(this.form.value.name,
        parseInt(this.form.value.slope, 10),
        parseInt(this.form.value.constant, 10)
      ) : new ExponentialFunction(this.form.value.name, parseInt(this.form.value.base, 10));
  }
}
