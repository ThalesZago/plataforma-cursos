import { Component } from '@angular/core';
import { iCurso } from '../../interfaces/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent {
  ELEMENT_DATA: iCurso[] = [
    {
      idCurso: 1,
      titulo: 'Curso de programação',
      descricao:
        'Curso de desenvolvimento de sistemas utilizando angular, php com framework laravel, etc',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
    {
      idCurso: 2,
      titulo: 'Curso de Crochê',
      descricao: 'Curso de design de crochês',
      editIcon: 'edit',
      deleteIcon: 'delete',
    },
  ];
  displayedColumns: string[] = [
    'titulo',
    'descricao',
    'editIcon',
    'deleteIcon',
  ];
  dataSource = this.ELEMENT_DATA;
}
