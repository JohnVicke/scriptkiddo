<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { get } from "svelte/store";
  import { auth } from "../../stores/auth";

  const query = createQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const authToken = await get(auth).clerk?.session?.getToken();
      const user = await fetch("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: authToken || "",
        },
      });
      return user;
    },
  });

  function handleLogin() {
    get(auth).clerk?.openSignIn();
  }

  function handleSignOut() {
    get(auth).clerk?.signOut();
  }

  function logUser() {
    console.log(get(auth).clerk?.user);
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={handleLogin}>Sign in</button>
<button on:click={logUser}>Click me</button>
<button on:click={handleSignOut}>Sign out</button>
<div>
  {#if $query.isLoading}
    <p>Loading...</p>
  {:else if $query.isError}
    <p>Error: {JSON.stringify($query.error)}</p>
  {:else if $query.isSuccess}
    <p>{JSON.stringify($query.data)}</p>
  {/if}
</div>
