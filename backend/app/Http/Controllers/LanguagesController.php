<?php

namespace App\Http\Controllers;

use App\Models\Languages;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguagesController extends Controller
{
    /**
     * Store a newly created language.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'level' => 'string|max:255',
            'user_id' => 'exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $language = Languages::create($request->all());
        return response()->json(['language' => $language], 201);
    }

    /**
     * Update the specified language.
     */
    public function update(Request $request, Languages $language)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'level' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $language->update($request->all());

        return response()->json(['language' => $language, 'status'=> 200]);
    }

    /**
     * Remove the specified language from storage.
     */
    public function destroy(Languages $language)
    {
        $language->delete();
        return response()->json(['message' => 'Language deleted successfully', 'status'=> 200]);
    }
}
