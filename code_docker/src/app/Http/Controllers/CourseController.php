<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        return Course::all();
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return $course;
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);

        return Course::create($validatedData);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string|max:255',
        ]);

        $course = Course::findOrFail($id);
        $course->fill($validatedData);
        $course->save();
        return $course;
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
    }
}
