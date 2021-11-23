<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function show($id)
    {
        $student = Student::findOrFail($id);
        return $student;
    }

    public function create(Request $request)
    {
        $rules = [];

        if (!$request['birthday'] === "") {
            $rules = ['birthday' => 'date'] + $rules;
        }
        $rules = $rules + ['name' => 'required|string|max:255'];
        $rules = $rules + ['email' => 'required|email|unique:students,email'];

        $validatedData = $request->validate($rules);

        return Student::create($validatedData);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email',
            'birthday' => 'date'
        ]);

        $student = Student::findOrFail($id);
        $student->fill($validatedData);
        $student->save();
        return $student;
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
    }
}
