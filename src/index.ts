import algo, { setPause, buildGraph, buildTree } from './algo';
import { Node } from './node';
import { Graph } from './graph';
import { Canvas } from './canvas';

window.onload = () => {
  const sd: HTMLDivElement = <HTMLDivElement> document.getElementById('sidebar');
  const can: Canvas = new Canvas(<HTMLCanvasElement> document.getElementById('main'));
  const rng: HTMLInputElement = <HTMLInputElement> document.getElementById('rangein');
  const lbo: HTMLLabelElement = <HTMLLabelElement> document.getElementById('timeout');
  const g: Graph<number> = new Graph();

  buildGraph(g);

  window.onresize = () => {
    can.width = null;
    can.height = null;
    const bbx: DOMRect = can.getBoundingClientRect();
    can.width = bbx.width;
    can.height = bbx.height;
    g.draw(can);
  };
  window.onresize(null);

  rng.oninput = () => {
    setPause(+rng.value);
    lbo.innerHTML = rng.value + 'ms';
  };

  setPause(300);
  rng.value = '300';
  lbo.innerHTML = '300ms';

  const opts: Array<HTMLDivElement> = Array.prototype.slice.call(document.getElementsByClassName('side-alg'));
  opts.forEach((b: HTMLDivElement) => {
    b.onclick = () => {
      if (sd.classList.contains('disabled')) return;
      const other: HTMLDivElement = document.querySelector('div.side-alg.selected');
      if (other) other.classList.remove('selected');
      b.classList.add('selected');
      sd.classList.add('disabled');
      // g.reset();
      g.clear();
      if (b.getAttribute('graph') === 'graph') buildGraph(g);
      else buildTree(g);
      algo[b.getAttribute('alg')](g, ready);
    };
  });

  function ready (): void {
    sd.classList.remove('disabled');
  }

  window.setInterval(() => {
    g.draw(can);
  }, 10);
};
