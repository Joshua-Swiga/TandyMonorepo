<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ConstactUsModel; // Corrected model name to follow PSR-4 naming conventions
use Illuminate\Support\Facades\Validator;

class ContactUsController extends Controller
{
    // Get Request
    public function index()
    {
        $contactInformation = ConstactUsModel::all();

        if ($contactInformation->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $contactInformation
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'You do not have any pending queries'
            ]);
        }
    }
    
    // Post Request
    public function sendMessageToAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'message' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $savingData = ConstactUsModel::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'message' => $request->message
        ]);

        if ($savingData) {
            return response()->json([
                'status' => 201,
                'message' => 'Message created successfully!'
            ], 201);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to save message'
            ], 500);
        }
    }

    // Delete Request
    public function deleteMessage($id)
    {
        $messageToDelete = ConstactUsModel::find($id);

        if ($messageToDelete) {
            $deletion = $messageToDelete->delete();

            if ($deletion) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Message has been deleted!',
                    'deleted_data' => $messageToDelete
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed to delete message'
                ], 500);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Message not found'
            ], 404);
        }
    }
}
