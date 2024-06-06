<?php

namespace App\Http\Controllers;

use App\Models\Skills;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkillsController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title.*.title' => 'string|max:255',
            'user_id' => 'exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->title as $title) {
            Skills::create([
                'title' => $title,
                'user_id' => $request->user_id,
            ]);
        }
        return response()->json(['message' => 'Skills added successfully','status'=> 200]);
    }

    /**
     * Remove the specified skill from storage.
     */
    public function destroy(Skills $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Skill deleted successfully','status'=> 200]);
    }
}



