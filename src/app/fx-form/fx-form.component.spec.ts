import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxFormComponent } from './fx-form.component';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FxFormComponent', () => {
  let component: FxFormComponent;
  let fixture: ComponentFixture<FxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FxFormComponent],
      imports: [MatInputModule, BrowserAnimationsModule, ReactiveFormsModule, MatIconModule, MatButtonModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function findInputName() {
    return fixture.debugElement.query(By.css('input[placeholder="Name"]'));
  }

  it('should render form field for name', () => {
    const input = findInputName();
    expect(input).toBeTruthy();
    expect(input.nativeElement.value).toEqual('');
  });

  function findTextarea() {
    return fixture.debugElement.query(By.css('textarea[placeholder="Description"]'));
  }

  it('should render form field for description', () => {
    const textarea = findTextarea();
    expect(textarea).toBeTruthy();
    expect(textarea.nativeElement.value).toEqual('');
  });

  function enterName(name) {
    const input = findInputName();

    const htmlInput = (input.nativeElement as HTMLInputElement);
    htmlInput.value = name;
    htmlInput.dispatchEvent(new Event('input'));
  }

  it('accepts user input', () => {
    enterName('My Function');

    expect(component.form.value).toEqual({
      name: 'My Function',
      description: null
    });
  });

  it('validates the function name', () => {
    enterName('Illegal Function Name');
    expect(component.form.valid).toBeFalsy();
    enterName('legalfn');
    expect(component.form.valid).toBeTruthy();
  });

  it('requires a function name', () => {
    enterName('');
    expect(component.form.valid).toBeFalsy();
  });

  it('cannot submit if invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    enterName('valid');
    fixture.detectChanges();
    expect((button.nativeElement as HTMLButtonElement).disabled).toBeFalsy();

    enterName('SO!INVALID!');
    fixture.detectChanges();
    expect((button.nativeElement as HTMLButtonElement).disabled).toBeTruthy();
  });

  it('automatically fills the form from data', () => {
    component.form.setValue({
      name: 'f',
      description: 'a cool function'
    });

    const inputName = findInputName();
    expect(inputName.nativeElement.value).toEqual('f');

    const descr = findTextarea();
    expect(descr.nativeElement.value).toEqual('a cool function');
  });
});
