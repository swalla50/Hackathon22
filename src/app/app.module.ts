import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { UserSettingsComponent } from './Components/user-settings/user-settings.component';
import { HomeComponent } from './Components/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { UserRightsComponent } from './Components/user-rights/user-rights.component';
import { UserModulesComponent } from './Components/user-modules/user-modules.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import {MatExpansionModule} from '@angular/material/expansion'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponentComponent } from './Components/child-component/child-component.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserSettingsComponent,
    HomeComponent,
    EditUserComponent,
    UserRightsComponent,
    UserModulesComponent,
    NavbarComponent,
    ChildComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatTooltipModule,
    TooltipModule,
    FullCalendarModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
