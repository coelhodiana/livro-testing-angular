import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from './../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import { NgRxCounterComponent } from './components/ngrx-counter/ngrx-counter.component';
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { CounterEffects } from './effects/counter.effects';
import { reducers } from './reducers';
import { CounterApiService } from './services/counter-api.service';
import { CounterService } from './services/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    HomeComponent,
    ServiceCounterComponent,
    NgRxCounterComponent,
    SignupFormComponent,
    ControlErrorsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // NgRx Store
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),

    // NgRx Effects
    EffectsModule.forRoot([CounterEffects]),

    // NgRx Store Dev Tools
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last n states
      logOnly: environment.production,
    }),
  ],
  providers: [CounterApiService, CounterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
