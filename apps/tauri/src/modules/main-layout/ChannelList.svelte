<script lang="ts">
  let channels: { url: string; name: string }[] = [{ name: "my channel", url: "/server/1/channel/1" }];
</script>

<nav class=" bg-slate-700 p-2">
  <ul class="flex flex-col gap-2">
    {#each channels as channel}
      <li>
        <a href={channel.url}>
          {channel.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
