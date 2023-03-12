<script lang="ts">
  import "../app.css";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import CreateSeverModal from "../modules/main-layout/CreateSeverModal.svelte";
  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <slot />
  <CreateSeverModal />
</QueryClientProvider>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.slate.900);
    color: theme(colors.slate.100);
  }
</style>
