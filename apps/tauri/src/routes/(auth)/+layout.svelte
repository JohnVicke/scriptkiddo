<script lang="ts">
  import ServerList from "../../modules/main-layout/ServerList.svelte";
  import ChannelList from "../../modules/main-layout/ChannelList.svelte";
  import Activity from "../../modules/main-layout/Activity.svelte";
</script>

<div class="flex gap-4">
  <ServerList />
  <ChannelList />
  <main class="flex-1 bg-slate-700 p-2">
    <slot />
  </main>
  <Activity />
</div>
