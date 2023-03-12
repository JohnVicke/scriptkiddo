<script lang="ts">
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { io } from "../../../../../../stores/ws/channel";
  let message: string;
  onMount(() => {
    io.connect();
    io.on("connect", () => {
      console.log("connected");
    });
    io.on("disconnect", () => {
      console.log("disconnected");
    });
    io.on("hello", (data: any) => {
      console.log(data);
    });
  });
  onDestroy(() => {
    io.disconnect();
  });
</script>

<div>
  <input
    type="text"
    class="rounded-sm text-black"
    bind:value={message}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        console.log(message);
      }
    }}
  />
  hello world from channel page {$page.params.slug}
</div>
