<script lang="ts">
  import { provider } from "./lib/ethprovider";
  import BlockCard from "./lib/BlockCard.svelte";

  let blocks: number[] = [];
  provider.on("block", (num) => {
    blocks.push(num);
    blocks = blocks;
  });
</script>

<main class="flex items-center justify-center h-screen">
  {blocks.length}
  {#each blocks as block}
    <BlockCard blockNumber={block} />
  {/each}
</main>
