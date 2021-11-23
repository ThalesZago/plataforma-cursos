import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/interfaces/aluno';

@Component({
  selector: 'app-aluno-modal',
  templateUrl: './aluno-modal.component.html',
  styleUrls: ['./aluno-modal.component.css'],
})
export class AlunoModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public student: Aluno,
    private matDialogRef: MatDialogRef<AlunoModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      birthday: [''],
    });
  }

  ngOnInit(): void {
    if (this.student) {
      this.form.setValue({
        id: this.student.id,
        name: this.student.name,
        email: this.student.email,
        birthday: this.student.birthday,
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

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get birthday(): FormControl {
    return this.form.get('birthday') as FormControl;
  }
}
