<script lang="ts">
  import ServerList from "../../modules/main-layout/ServerList.svelte";
  import ChannelList from "../../modules/main-layout/ChannelList.svelte";
  import Activity from "../../modules/main-layout/Activity.svelte";
  import { io } from "../../lib/ws/io";
  import { onDestroy, onMount } from "svelte";

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

<div class="flex gap-4">
  <ServerList />
  <ChannelList />
  <main class="flex-1 bg-slate-700 p-2">
    <slot />
  </main>
  <Activity />
</div>
