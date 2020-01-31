import { SearchParkingComponent } from './components/search-parking/search-parking.component';
import { EditParkingComponent } from './components/parking/edit-parking/edit-parking.component';
import { NewParkingComponent } from './components/parking/new-parking/new-parking.component';
import { AdmParkingComponent } from './components/parking/adm-parking/adm-parking.component';
import { ListSugerenciasComponent } from './components/list-sugerencias/list-sugerencias.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';

const appRoutes: Routes = [
  {
    path: 'administration',
    component: SidebarComponent,
    children: [
      { path: 'list-sugerencias', component: ListSugerenciasComponent },
      { path: 'mant-parking', component: AdmParkingComponent },
      { path: 'edit-parking/:id', component: EditParkingComponent },
      { path: 'new-parking', component: NewParkingComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'search-parking', component: SearchParkingComponent },
  { path: 'sugerencias', component: SugerenciasComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

