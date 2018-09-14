import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FxFormComponent } from './fx-form/fx-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FxLinearFormComponent } from './fx-linear-form/fx-linear-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FxFormComponent,
    FxLinearFormComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule, MatFormFieldModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
