import { Node, Edge } from './node';
import { Canvas } from './canvas';

export class Graph<T> {
  public nodes: Array<Node<T>>;

  constructor (nodes: Array<Node<T>> = []) {
    this.nodes = nodes;
  }

  public addEdge (f: number, t: number, c: T): void {
    const e: Edge<T> = new Edge(this.nodes[f], this.nodes[t], c);
    this.nodes[f].addEdge(e);
    this.nodes[t].addEdge(e);
  }

  public get edges (): Array<Edge<T>> {
    return [...new Set(this.nodes.map(n => n.edges).flat())];
  }

  public reset (): void {
    this.nodes.forEach(n => {
      n.active = false;
      n.used = false;
      n.consider = false;
      n.cost = Number.MAX_VALUE;
      n.prev = null;
      n.edges.forEach(e => {
        e.active = false;
        e.used = false;
        e.consider = false;
      });
    });
  }

  public clear (): void {
    Node.reset();
    this.nodes = [];
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
