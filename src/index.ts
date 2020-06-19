import algo from './algo';
import { Node } from './node';
import { Graph } from './graph';
import { Canvas } from './canvas';

window.onload = () => {
  const sd: HTMLDivElement = <HTMLDivElement> document.getElementById('sidebar');
  const can: Canvas = new Canvas(<HTMLCanvasElement> document.getElementById('main'));
  const g: Graph<number> = new Graph([
    new Node<number>(10, 15), 
    new Node<number>(15, 80),
    new Node<number>(35, 30),
    new Node<number>(47, 70),
    new Node<number>(56, 45),
    new Node<number>(62, 20),
    new Node<number>(75, 75),
    new Node<number>(90, 50)
  ]);

  g.addEdge(0, 2, 5);
  g.addEdge(0, 1, 2);
  g.addEdge(0, 5, 6);
  g.addEdge(1, 4, 5);
  g.addEdge(1, 2, 3);
  g.addEdge(2, 3, 3);
  g.addEdge(2, 7, 10);
  g.addEdge(3, 6, 3);
  g.addEdge(4, 5, 1);
  g.addEdge(4, 6, 2);
  g.addEdge(6, 7, 2);

  window.onresize = () => {
    can.width = null;
    can.height = null;
    const bbx: DOMRect = can.getBoundingClientRect();
    can.width = bbx.width;
    can.height = bbx.height;
    g.draw(can);
  };
  window.onresize(null);

  const opts: Array<HTMLDivElement> = Array.prototype.slice.call(document.getElementsByClassName('side-alg'));
  opts.forEach((b: HTMLDivElement) => {
    b.onclick = () => {
      if (sd.classList.contains('disabled')) return;
      const other: HTMLDivElement = document.querySelector('div.side-alg.selected');
      if (other) other.classList.remove('selected');
      b.classList.add('selected');
      sd.classList.add('disabled');
      g.reset();
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
