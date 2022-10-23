import { Component, For, createMemo, createSignal, onCleanup } from "solid-js";
import ethprovider from "./ethprovider";
import Block from "./Block";

const MAX_BLOCKS = 5;

const BlockList: Component = () => {
  const [latestBlock, setLatestBlock] = createSignal<number>(null);

  ethprovider.on("block", setLatestBlock);
  onCleanup(() => {
    ethprovider.off("block", setLatestBlock);
  });

  const blocks = createMemo<number[]>(() => {
    if (latestBlock() == null) return [];

    const arr = [];
    for (let i = 0; i < MAX_BLOCKS; i++) {
      arr.push(latestBlock() - i);
    }
    return arr;
  });

  return (
    <div class="flex flex-col">
      <For each={blocks()} fallback={<div>Fetching latest block...</div>}>
        {(blockNum) => (
          <div>
            <Block num={blockNum} />
          </div>
        )}
      </For>
    </div>
  );
};

export default BlockList;
