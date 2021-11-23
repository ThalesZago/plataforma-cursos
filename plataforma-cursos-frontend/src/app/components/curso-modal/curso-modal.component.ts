import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iCurso } from 'src/app/interfaces/curso';

@Component({
  selector: 'app-curso-modal',
  templateUrl: './curso-modal.component.html',
  styleUrls: ['./curso-modal.component.css'],
})
export class CursoModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public course: iCurso,
    private matDialogRef: MatDialogRef<CursoModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.course) {
      this.form.setValue({
        id: this.course.id,
        title: this.course.title,
        description: this.course.description,
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
