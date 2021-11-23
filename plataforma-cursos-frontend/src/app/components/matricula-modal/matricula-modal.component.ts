import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iCurso } from 'src/app/interfaces/curso';
import { iMatricula } from 'src/app/interfaces/matricula';
import { CursoService } from 'src/app/services/curso.service';
@Component({
  selector: 'app-matricula-modal',
  templateUrl: './matricula-modal.component.html',
  styleUrls: ['./matricula-modal.component.css'],
})
export class MatriculaModalComponent implements OnInit {
  form: FormGroup;
  aCourse!: iCurso[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public enrollment: iMatricula,
    private matDialogRef: MatDialogRef<MatriculaModalComponent>,
    private formBuilder: FormBuilder,
    private courseService: CursoService
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      student_id: [''],
      course_id: [''],
      student: [''],
      course: [''],
    });
  }
  listCourses() {
    this.courseService
      .listCourses()
      .subscribe((dados) => (this.aCourse = dados));
  }

  ngOnInit(): void {
    this.listCourses();

    if (this.enrollment) {
      this.form.setValue({
        id: this.enrollment.id,
        student_id: this.enrollment.student_id,
        course_id: this.enrollment.course_id,
        student: this.enrollment.student,
        course: this.enrollment.course,
      });
    }
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.matDialogRef.close(this.form.value);
    }
  }

  handleClose(): void {
    this.matDialogRef.close();
  }
}
