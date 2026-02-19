<?php

namespace App\Http\Controllers;

use App\Models\Column;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function updateWipLimit(Request $request, Column $column)
    {
        $validated = $request->validate([
            'wip_limit' => 'nullable|integer|min:0',
        ]);

        if ($validated['wip_limit'] !== null) {
            $currentTaskCount = $column->tasks()->count();
            if ($validated['wip_limit'] < $currentTaskCount) {
                return response()->json([
                    'message' => "Cannot set WIP limit below current task count ({$currentTaskCount}).",
                    'errors' => [
                        'wip_limit' => ["Cannot set WIP limit below current task count ({$currentTaskCount})."]
                    ]
                ], 422);
            }
        }

        $column->update([
            'wip_limit' => $validated['wip_limit']
        ]);

        return response()->json(['success' => true]);
    }
}
