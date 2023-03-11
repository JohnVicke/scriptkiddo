<script lang="ts">
  import { PlusCircle, Home } from "lucide-svelte";
  import { createServerModalOpen } from "../../stores";

  let servers: { url: string; name: string }[] = [{ name: "my server", url: "/server/1" }];

  function openCreateModal() {
    createServerModalOpen.update(() => true);
  }
</script>

<aside class="bg-slate-700 p-2">
  <a href="/"><Home size="24" /></a>
  <ul class="flex flex-col gap-2">
    {#each servers as server}
      <li>
        <a href={server.url} class="px-4 py-2">
          {server.name}
        </a>
      </li>
    {/each}
    <button on:click={openCreateModal} class="mx-auto"><PlusCircle size="32" /></button>
  </ul>
</aside>
