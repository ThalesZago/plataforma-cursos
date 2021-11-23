/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  merge,
  Subscription,
  take,
} from 'rxjs';
import { TableColumn } from 'src/app/interfaces/table-column';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from '../../interfaces/aluno';
import { AlunoModalComponent } from '../aluno-modal/aluno-modal.component';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
})
export class AlunoComponent implements AfterViewInit, OnInit, OnDestroy {
  aStudent!: Aluno[];
  aColumns: Array<TableColumn>;
  aColumnsHeaders: Array<string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('campoBusca') campoBusca!: ElementRef<HTMLInputElement>;

  resultsLength = 0;

  form: FormGroup;
  refresh: BehaviorSubject<boolean>;
  subscriptions$: Array<Subscription>;

  constructor(
    private studentService: AlunoService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.aColumnsHeaders = ['name', 'email', 'birthday', 'actions'];
    this.aColumns = [
      {
        label: 'Nome',
        property: 'name',
        type: 'text',
      },
      {
        label: 'Email',
        property: 'email',
        type: 'text',
      },
      {
        label: 'Data de Nascimento',
        property: 'birthday',
        type: 'date',
      },
      {
        label: 'Ações',
        property: 'actions',
        type: 'button',
      },
    ];

    this.form = this.formBuilder.group({ search: [''] });
    this.refresh = new BehaviorSubject<boolean>(false);
    this.subscriptions$ = new Array<Subscription>();
  }

  handleModal(student?: Aluno): void {
    this.matDialog
      .open(AlunoModalComponent, {
        minWidth: '400px',
        data: student,
      })
      .afterClosed()
      .subscribe((res: Aluno | undefined) => {
        if (res) {
          if (student) {
            this.studentService
              .editStudent(res)
              .pipe(take(1))
              .subscribe(() => this.listStudent());
          } else {
            this.studentService
              .createStudent(res)
              .pipe(take(1))
              .subscribe(() => this.listStudent());
          }
        }
      });
  }

  listStudent() {
    this.studentService
      .listStudents()
      .subscribe((dados) => (this.aStudent = dados));
  }

  handleDelete(student: Aluno): void {
    this.studentService
      .deleteStudent(student)
      .pipe(take(1))
      .subscribe(() => this.listStudent());
    alert('aluno excluído com sucesso');
    window.location.reload();
  }
  ngOnInit(): void {
    this.listStudent();
  }

  ngAfterViewInit(): void {
    this.subscriptions$.push(
      merge(
        this.sort?.sortChange,
        this.search.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      ).subscribe(() => (this.paginator.pageIndex = 0))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
  }

  get search(): FormControl {
    return this.form.get('search') as FormControl;
  }
}
