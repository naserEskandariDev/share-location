import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: 'location',
    loadChildren: () => import('./feature/locations/locations.module').then(m => m.LocationsModule)
  },
  {path: '', redirectTo: 'location', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
