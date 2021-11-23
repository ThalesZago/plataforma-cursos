import { Component } from '@angular/core';
import { Aluno } from '../../interfaces/aluno';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
})
export class AlunoComponent {
  ELEMENT_DATA: Aluno[] = [
    {
      idAluno: 1,
      nome: 'Hydrogen',
      email: '1.0079',
      dataNascimento: 'H',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 2,
      nome: 'Helium',
      email: '4.0026',
      dataNascimento: 'He',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 3,
      nome: 'Lithium',
      email: '6.941',
      dataNascimento: 'Li',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 4,
      nome: 'Beryllium',
      email: '9.0122',
      dataNascimento: 'Be',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 5,
      nome: 'Boron',
      email: '10.811',
      dataNascimento: 'B',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 6,
      nome: 'Carbon',
      email: '12.0107',
      dataNascimento: 'C',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 7,
      nome: 'Nitrogen',
      email: '14.0067',
      dataNascimento: 'N',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 8,
      nome: 'Oxygen',
      email: '15.9994',
      dataNascimento: 'O',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 9,
      nome: 'Fluorine',
      email: '18.9984',
      dataNascimento: 'F',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idAluno: 10,
      nome: 'Neon',
      email: '20.1797',
      dataNascimento: 'Ne',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
  ];
  displayedColumns: string[] = [
    'nome',
    'email',
    'dataNascimento',
    'editIcon',
    'deleteIcon',
  ];
  dataSource = this.ELEMENT_DATA;
}
