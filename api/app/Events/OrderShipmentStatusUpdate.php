<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderShipmentStatusUpdate implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $status = "test";

    /**
     * Create a new event instance.
     */
    public function __construct(
    )
    {
        $this->status = "test";
    }

    public function broadcastAs(): string
    {
        return 'testing';
    }

    public function broadcastOn(): Channel
    {
        return new Channel('chat.1');
    }
}
