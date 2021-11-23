<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;

class EnrollmentController extends Controller
{
    public function index()
    {
        return Enrollment::with('student')->with('course')->get();
    }

    public function show($id)
    {
        $enrollment = Enrollment::with('course')->with('student')->where(['id' => $id])->first();
        return $enrollment;
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|integer|exists:students,id',
            'course_id' => 'required|integer|exists:courses,id',
        ]);

        return Enrollment::create($validatedData);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'student_id' => 'integer|exists:students,id',
            'course_id' => 'integer|exists:courses,id',
        ]);

        $enrollment = Enrollment::findOrFail($id);
        $enrollment->fill($validatedData);
        $enrollment->save();
        return $enrollment;
    }

    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();
    }
}
