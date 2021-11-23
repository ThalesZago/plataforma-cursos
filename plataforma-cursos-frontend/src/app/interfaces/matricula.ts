export interface iMatricula {
  id: number;
  student_id: number;
  course_id: number;
  student: {
    id: number;
    name: string;
    email: string;
  };
  course: {
    id: number;
    title: string;
    description: string;
  };
}
