<?php

namespace App\Exceptions;

use Exception;

class WipLimitReachedException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'error' => $this->getMessage()
        ], 422);
    }
}
