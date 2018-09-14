import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxFormComponent } from './fx-form.component';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComplexityCheckerService } from '../complexity-checker.service';
import { anything, instance, mock, when } from 'ts-mockito';
import { of, Subject } from 'rxjs';

describe('FxFormComponent', () => {
  let component: FxFormComponent;
  let fixture: ComponentFixture<FxFormComponent>;

  let check: ComplexityCheckerService;

  beforeEach(async(() => {
    check = mock(ComplexityCheckerService);
    when(check.checkComplexityOkay(anything())).thenReturn(of(true));

    TestBed.configureTestingModule({
      declarations: [FxFormComponent],
      imports: [MatInputModule, BrowserAnimationsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
      providers: [{ provide: ComplexityCheckerService, useValue: instance(check) }]
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

  function enterValue(htmlInput, name) {
    htmlInput.value = name;
    htmlInput.dispatchEvent(new Event('input'));
  }

  function enterName(name) {
    enterValue(findInputName().nativeElement as HTMLInputElement, name);
  }

  function enterDescription(text: string) {
    enterValue(findTextarea().nativeElement as HTMLTextAreaElement, text);
  }

  function findSlope() {
    return fixture.debugElement.query(By.css('input[placeholder="Slope"]'));
  }

  function enterSlope(slope: string) {
    enterValue(findSlope().nativeElement, slope);
  }

  it('accepts user input', () => {
    enterName('My Function');

    expect(component.form.value).toEqual({
      name: 'My Function',
      description: null,
      slope: '1',
      constant: '0'
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
    component.example();

    const inputName = findInputName();
    expect(inputName.nativeElement.value).toEqual('foo');

    const descr = findTextarea();
    expect(descr.nativeElement.value).toEqual('an example function');
  });

  it('validates the description synchronously', () => {
    enterName('foo');

    when(check.checkComplexityOkay('example')).thenReturn(of(false));

    enterDescription('example');
    expect(component.form.valid).toBeFalsy();
  });

  it('validates the description asynchronously', () => {
    enterName('foo');

    const checkResult = new Subject<boolean>();
    when(check.checkComplexityOkay('example')).thenReturn(checkResult);

    enterDescription('example');
    expect(component.form.valid).toBeFalsy();
    expect(component.form.invalid).toBeFalsy();
    expect(component.form.pending).toBeTruthy();

    checkResult.next(false);

    expect(component.form.valid).toBeFalsy();
  });

  it('can compute f(1)', () => {
    enterName('f');
    enterSlope('100');

    expect(component.form.valid).toBeTruthy();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.result')).nativeElement.textContent
    ).toContain('f(1) = 100');
  });
});
