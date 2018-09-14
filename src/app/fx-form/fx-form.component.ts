import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rf-fx-form',
  templateUrl: './fx-form.component.html',
  styleUrls: ['./fx-form.component.scss']
})
export class FxFormComponent implements OnInit {

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z]+$/)
      ]),
      description: new FormControl()
    });
  }

  debug() {
    console.log(this.form.value);
  }
}
