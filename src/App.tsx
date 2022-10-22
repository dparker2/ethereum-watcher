import { Component, createSignal } from "solid-js";
import ethprovider from "./ethprovider";
import Block from "./Block";

const App: Component = () => {
  const [blocks, setBlocks] = createSignal([]);
  ethprovider.on("block", (num) => {
    setBlocks([...blocks(), num]);
    console.log(blocks(), num);
  });

  return (
    <div>
      {blocks()
        .slice()
        .reverse()
        .map((blockNum) => (
          <div>
            <Block num={blockNum} />
          </div>
        ))}
    </div>
  );
};

export default App;
