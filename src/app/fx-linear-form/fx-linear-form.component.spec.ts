import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxLinearFormComponent } from './fx-linear-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FxLinearFormComponent', () => {
  let component: FxLinearFormComponent;
  let fixture: ComponentFixture<FxLinearFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FxLinearFormComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxLinearFormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      constant: new FormControl(),
      slope: new FormControl()
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
