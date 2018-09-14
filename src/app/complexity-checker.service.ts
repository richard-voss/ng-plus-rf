import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplexityCheckerService {

  keywords = ['complex', 'complicated', 'non-linear', 'polynom'];

  checkComplexityOkay(description: string): Observable<boolean> {
    return of(!this.keywords.find(kw => description.includes(kw))).pipe(delay(1000));
  }
}
