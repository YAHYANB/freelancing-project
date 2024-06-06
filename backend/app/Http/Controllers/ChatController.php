<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;


class ChatController extends Controller
{
    public function createChat(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|integer',
            'receiver_id' => 'required|integer',
        ]);

        if ($request->sender_id !== $request->receiver_id) {
            $alreadyExist = Chat::where(function ($query) use ($request) {
                $query->where('sender_id', $request->sender_id)
                    ->where('receiver_id', $request->receiver_id);
            })->orWhere(function ($query) use ($request) {
                $query->where('receiver_id', $request->sender_id)
                    ->where('sender_id', $request->receiver_id);
            })->exists();

            if (!$alreadyExist) {
                $chat = Chat::create([
                    'sender_id' => $request->sender_id,
                    'receiver_id' => $request->receiver_id,
                ]);
                return response()->json(['chat' => $chat, 'status' => 200]);
            } else {
                return response()->json(['message' => 'Chat already exists', 'status' => 200]);
            }
        } else {
            return response()->json(['message' => 'Sender and receiver are the same', 'status' => 400]);
        }
    }



    public function userChats($userId)
    {
        try {
            $chats = Chat::where('sender_id', $userId)
                ->orWhere('receiver_id', $userId)
                ->get();

            return response()->json($chats, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function findChat($firstId, $secondId)
    {
        try {
            $chat = Chat::where(function ($query) use ($firstId, $secondId) {
                $query->where('sender_id', $firstId)
                    ->where('receiver_id', $secondId);
            })
                ->orWhere(function ($query) use ($firstId, $secondId) {
                    $query->where('sender_id', $secondId)
                        ->where('receiver_id', $firstId);
                })
                ->first();

            return response()->json($chat, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}
