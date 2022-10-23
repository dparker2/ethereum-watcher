import { formatUnits } from "ethers/lib/utils";
import {
  Component,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onMount,
  Show,
} from "solid-js";
import ethprovider from "./ethprovider";

interface Props {
  num: number;
}

const PendingBlock: Component<Props> = ({ num }) => {
  return (
    <div class="stats shadow animate-pulse">
      <div class="stat">
        <div class="stat-title">Block Number</div>
        <div class="stat-value">{num}</div>
        <div class="stat-desc h-2.5 bg-gray-200 rounded-full mt-1.5"></div>
      </div>
      <div class="stat">
        <div class="stat-title">Base Fee</div>
        <div class="stat-value h-10 w-36 bg-gray-200 rounded-full"></div>
        <div class="stat-desc h-2.5 bg-gray-200 rounded-full mt-1.5"></div>
      </div>
    </div>
  );
};

const Block: Component<Props> = ({ num }) => {
  console.log(`Running Block ${num}.`);

  const [block] = createResource(() => ethprovider.getBlock(num));
  createEffect(() => block() && console.log(block()));

  return (
    <>
      <Show
        when={block() !== undefined}
        fallback={() => <PendingBlock num={num} />}
      >
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">Block Number</div>
            <div class="stat-value">{num}</div>
            <div class="stat-desc">
              {block().transactions.length} Transactions
            </div>
          </div>
          <div class="stat">
            <div class="stat-title">Base Fee</div>
            <div class="stat-value">
              {block().baseFeePerGas.div(1e9).toString()} Gwei
            </div>
            <div class="stat-desc">
              {formatUnits(block().gasUsed.mul(10000).div(block().gasLimit), 2)}
              % Gas Used
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default Block;
