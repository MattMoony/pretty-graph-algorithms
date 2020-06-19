import { Node, Edge } from './node';
import { Canvas } from './canvas';

export class Graph<T> {
  public nodes: Array<Node<T>>;

  constructor (nodes: Array<Node<T>> = []) {
    this.nodes = nodes;
  }

  public addEdge (f: number, t: number, c: T): void {
    const e: Edge<T> = { from: this.nodes[f], to: this.nodes[t], cost: c, active: false, used: false };
    this.nodes[f].addEdge(e);
    this.nodes[t].addEdge(e);
  }

  public reset (): void {
    this.nodes.forEach(n => {
      n.active = false;
      n.used = false;
      n.prev = null;
      n.edges.forEach(e => {
        e.active = false;
        e.used = false;
      });
    });
  }

  public draw (ctx: Canvas): void {
    ctx.clear();
    const done: Array<Node<T>> = [];
    this.nodes.forEach(n => {
      n.drawEdges(ctx, done);
      done.push(n);
    });
    this.nodes.forEach(n => n.draw(ctx));
  }
};
