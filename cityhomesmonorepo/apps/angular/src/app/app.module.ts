import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DxTemplateModule, DxDataGridModule, DxNumberBoxModule, DxCheckBoxModule} from 'devextreme-angular';

import { RegisterComponent } from './register/register.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { ViewueachserComponent } from './viewueachser/viewueachser.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddlocationComponent } from './location/addlocation/addlocation.component';
import { ViewlocationComponent } from './location/viewlocation/viewlocation.component';
import { EditlocationComponent } from './location/editlocation/editlocation.component';
import { ViewunitComponent } from './Unit/viewunit/viewunit.component';
import { LandingPageComponent } from './public/landingpage/landingpage.component';
import { TestComponent } from './public/test/test.component';
import { AddUnitComponent } from './Unit/add-unit/add-unit.component';
import { AdministrativeActionsOnUnitsComponent } from './Unit/administrative-actions-on-units/administrative-actions-on-units.component';
import { ViewEachUnitComponent } from './Unit/view-each-unit/view-each-unit.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { FooterComponent } from './footer/footer.component';
import { GallaryComponent } from './gallary/gallary.component';
import { AboutUsComponent } from './public/about-us/about-us.component';
import { CustomRequestComponent } from './public/custom-request/custom-request.component';
import { RequestCustomUnitComponent } from './request-custom-unit/request-custom-unit.component';
import { CustomPipeNamePipe } from './pipes/search-pipe/custom-pipe-name.pipe';
import { FilterUserPipe } from './pipes/filterUser/filter-user.pipe';
import { UserQueryInformationComponent } from './User/user-query-information/user-query-information.component';
import { UnitDisplayComponent } from './premiumProperties/unit-display/unit-display.component';
import { LoaderComponent } from './public/loader/loader.component';


@NgModule({ // This is where we register components that have been created.
  declarations: [
    
    AppComponent,
    RegisterComponent,
    ViewusersComponent,
    ViewueachserComponent,
    NavigationComponent,
    AddlocationComponent,
    ViewlocationComponent,
    EditlocationComponent,
    ViewunitComponent,
    LandingPageComponent,
    TestComponent,
    AddUnitComponent,
    AdministrativeActionsOnUnitsComponent,
    ViewEachUnitComponent,
    SignInComponent,
    UserProfileComponent,
    FooterComponent,
    GallaryComponent,
    AboutUsComponent,
    CustomRequestComponent,
    RequestCustomUnitComponent,
    CustomPipeNamePipe,

    FilterUserPipe,
      UserQueryInformationComponent,
      UnitDisplayComponent,
      LoaderComponent,
  ],


  imports: [ // This is where we add external modules tht are needed by the internal components
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DxTemplateModule,
    DxDataGridModule,
    CommonModule,  // Allows directives to be used
    DxNumberBoxModule,
    DxCheckBoxModule,
    ReactiveFormsModule,
  ],

  providers: [],
  bootstrap: [ 
    AppComponent 
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
