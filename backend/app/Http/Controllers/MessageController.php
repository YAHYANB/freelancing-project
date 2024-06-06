<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function addMessage(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|integer',
            'sender_id' => 'required|integer',
            'text' => 'required|string',
        ]);

        try {
            $message = Message::create([
                'chat_id' => $request->chat_id,
                'sender_id' => $request->sender_id,
                'text' => $request->text,
            ]);

            return response()->json($message, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getMessages($chatId)
    {
        try {
            $messages = Message::where('chat_id', $chatId)->get();

            return response()->json($messages, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
