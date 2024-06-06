<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('buyer_id');
            $table->unsignedBigInteger('seller_id');
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('gig_id')->constrained()->onDelete('cascade');
            $table->text('description');
            $table->string('transaction_id')->unique();
            $table->boolean('is_sent')->default(0);
            $table->boolean('buyer_seen')->default(false);
            $table->boolean('seller_seen')->default(false);
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending');
            $table->string('image');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
