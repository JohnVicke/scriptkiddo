<script lang="ts">
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { io } from "../../../../../../lib/ws/io";

  let messages: { message: string; from: string }[] = [];

  onMount(() => {
    io.emit("joinRoom", $page.params.slug);
    io.on("message", (message) => {
      messages = [...messages, message];
    });
  });

  onDestroy(() => {
    io.emit("leaveRoom", $page.params.slug);
  });

  let message: string;

  function sendMessage() {
    io.emit("message", message);
    message = "";
  }
</script>

<div>
  <input
    type="text"
    class="rounded-sm text-black"
    bind:value={message}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    }}
  />
  hello world from channel page {$page.params.slug}
  {#each messages as message}
    <div class="flex gap-4">
      <b>{message.from}</b>
      <p>
        {message.message}
      </p>
    </div>
  {/each}
</div>
