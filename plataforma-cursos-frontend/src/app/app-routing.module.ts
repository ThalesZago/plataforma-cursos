import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno/aluno.component';
import { CursoComponent } from './components/curso/curso.component';
import { HomeComponent } from './components/home/home.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'aluno', component: AlunoComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'matricula', component: MatriculaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
