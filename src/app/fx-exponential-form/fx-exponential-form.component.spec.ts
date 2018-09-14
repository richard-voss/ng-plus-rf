import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxExponentialFormComponent } from './fx-exponential-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FxExponentialFormComponent', () => {
  let component: FxExponentialFormComponent;
  let fixture: ComponentFixture<FxExponentialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxExponentialFormComponent ],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxExponentialFormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      base: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
