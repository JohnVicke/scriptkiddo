<script lang="ts">
  import { get } from "svelte/store";
  import { auth } from "../../stores/auth";

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
<button on:click={handleLogin}>Click me</button>
<button on:click={logUser}>Click me</button>
