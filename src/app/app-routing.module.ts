import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { UserSettingsComponent } from './Components/user-settings/user-settings.component';
import { HomeComponent } from './Components/home/home.component';
import { UserModulesComponent } from './Components/user-modules/user-modules.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { UserRightsComponent } from './Components/user-rights/user-rights.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'settings', component: UserSettingsComponent, children: [
      { path: 'userRights', component: UserRightsComponent },
      { path: 'editUser', component: EditUserComponent },
      { path: 'userModules', component: UserModulesComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
