<script lang="ts">
  let i: number = 0;
  const increment = () => i++;
</script>

<main>
  <button class="btn" on:click={increment}>Test {i}</button>
</main>
