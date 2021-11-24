<?php

namespace Tests\Feature;

use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    public function createTest(Request $request)
    {
        $rules = [];

        if (!$request['birthday'] === "") {
            $rules = ['birthday' => 'string'] + $rules;
        }
        $rules = $rules + ['name' => 'required|string|max:255'];
        $rules = $rules + ['email' => 'required|email|unique:students,email'];

        $validatedData = $request->validate($rules);

        return StudentTest::createTest($validatedData);
    }
}
