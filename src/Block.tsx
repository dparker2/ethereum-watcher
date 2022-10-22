import type { Component } from "solid-js";

interface Props {
  num: number;
}

const Block: Component<Props> = ({ num }) => {
  return (
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Block Number</div>
        <div class="stat-value">{num}</div>
        <div class="stat-desc">description</div>
      </div>
    </div>
  );
};

export default Block;
