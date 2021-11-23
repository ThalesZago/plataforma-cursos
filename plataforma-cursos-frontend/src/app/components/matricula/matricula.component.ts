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
import { iMatricula } from 'src/app/interfaces/matricula';
import { TableColumn } from 'src/app/interfaces/table-column';
import { MatriculaService } from 'src/app/services/matricula.service';
import { MatriculaModalComponent } from '../matricula-modal/matricula-modal.component';
@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
})
export class MatriculaComponent implements OnInit, AfterViewInit, OnDestroy {
  aEnrollment!: iMatricula[];
  aColumns: Array<TableColumn>;
  aColumnsHeaders: Array<string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;

  form: FormGroup;
  refresh: BehaviorSubject<boolean>;
  subscriptions$: Array<Subscription>;

  constructor(
    private enrollmentService: MatriculaService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.aColumnsHeaders = ['student_id', 'course_id', 'actions'];
    this.aColumns = [
      {
        label: 'RA Aluno',
        property: 'student_id',
        type: 'number',
      },
      {
        label: 'Registro do curso',
        property: 'course_id',
        type: 'number',
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

  handleModal(enrollment?: iMatricula): void {
    this.matDialog
      .open(MatriculaModalComponent, {
        minWidth: '400px',
        data: enrollment,
      })
      .afterClosed()
      .subscribe((res: iMatricula | undefined) => {
        if (res) {
          if (enrollment) {
            this.enrollmentService
              .editEnrollment(res)
              .pipe(take(1))
              .subscribe(() => this.listEnrollments());
          } else {
            this.enrollmentService
              .createEnrollment(res)
              .pipe(take(1))
              .subscribe(() => this.listEnrollments());
          }
        }
      });
  }

  listEnrollments() {
    this.enrollmentService
      .listEnrollments()
      .subscribe((dados) => (this.aEnrollment = dados));
  }

  handleDelete(enrollment: iMatricula): void {
    this.enrollmentService
      .deleteEnrollment(enrollment)
      .pipe(take(1))
      .subscribe(() => this.listEnrollments());
    alert('Matrícula excluída com sucesso');
    window.location.reload();
  }
  ngOnInit(): void {
    this.listEnrollments();
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
