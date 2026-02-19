<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
            'role' => 'required|in:manager,member',
        ]);

        // Prevent duplicate
        $exists = \App\Models\ProjectMember::where('project_id', $validated['project_id'])
            ->where('user_id', $validated['user_id'])
            ->exists();

        if (!$exists) {
            \App\Models\ProjectMember::create($validated);
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\App\Models\ProjectMember $projectMember)
    {
        $projectMember->delete();
        return back();
    }
}
