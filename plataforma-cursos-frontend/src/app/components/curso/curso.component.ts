import {
  AfterViewInit,
  Component,
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
import { iCurso } from 'src/app/interfaces/curso';
import { TableColumn } from 'src/app/interfaces/table-column';
import { CursoService } from 'src/app/services/curso.service';
import { CursoModalComponent } from '../curso-modal/curso-modal.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit, AfterViewInit, OnDestroy {
  aCourse!: iCurso[];
  aColumns: Array<TableColumn>;
  aColumnsHeaders: Array<string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;

  form: FormGroup;
  refresh: BehaviorSubject<boolean>;
  subscriptions$: Array<Subscription>;

  constructor(
    private courseService: CursoService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.aColumnsHeaders = ['title', 'description', 'actions'];
    this.aColumns = [
      {
        label: 'Titulo',
        property: 'title',
        type: 'text',
      },
      {
        label: 'Descrição',
        property: 'description',
        type: 'text',
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

  handleModal(course?: iCurso): void {
    this.matDialog
      .open(CursoModalComponent, {
        minWidth: '400px',
        data: course,
      })
      .afterClosed()
      .subscribe((res: iCurso | undefined) => {
        if (res) {
          if (course) {
            this.courseService
              .editCourse(res)
              .pipe(take(1))
              .subscribe(() => this.listCourses());
          } else {
            this.courseService
              .createCourse(res)
              .pipe(take(1))
              .subscribe(() => this.listCourses());
          }
        }
      });
  }

  listCourses() {
    this.courseService
      .listCourses()
      .subscribe((dados) => (this.aCourse = dados));
  }

  handleDelete(course: iCurso): void {
    this.courseService
      .deleteCourse(course)
      .pipe(take(1))
      .subscribe(() => this.listCourses());
    alert('Curso excluído com sucesso!');
    window.location.reload();
  }
  ngOnInit(): void {
    this.listCourses();
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
