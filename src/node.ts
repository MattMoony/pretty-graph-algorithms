import { Canvas } from './canvas';

export interface Edge<T> {
  from: Node<T>;
  to: Node<T>;
  cost: T;
  active: boolean;
  used: boolean;
}

const LETTERS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Node<T> {
  public x: number;
  public y: number;
  public active: boolean;
  public used: boolean;
  public prev: Edge<T>;
  public edges: Array<Edge<T>>;

  private s: number = 4;
  private l: string;

  private static lind: number = 0;
  
  constructor (x: number, y: number, s?: number, l?: string, edges?: Array<Edge<T>>) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.used = false;
    this.edges = edges || [];
    if (s) this.s = s;
    this.l = l || LETTERS[Node.lind++];
  }

  public addEdge (n: Node<T>|Edge<T>, c?: T): void {
    if (c && n instanceof Node) this.edges.push({ from: this, to: n, cost: c, active: false, used: false });
    else this.edges.push(<Edge<T>> n);
  }

  public to (e: Edge<T>): Node<T> {
    return e.to !== this ? e.to : e.from;
  }

  public draw (ctx: Canvas): void {
    ctx.circle(this.x, this.y, this.s, this.used ? '#FFAC76' : this.active ? '#9B5AFF' : undefined, this.used ? 'rgba(255, 172, 118, .15)' : this.active ? 'rgba(155, 90, 255, .15)' : undefined);
    ctx.text(this.l, this.x, this.y, this.s, this.used ? '#FFAC76' : this.active ? '#9B5AFF' : undefined);
  }

  public drawEdges (ctx: Canvas, done: Array<Node<T>>): void {
    this.edges.forEach(e => {
      const to: Node<T> = this.to(e);
      if (done.indexOf(to) === -1) return;
      const mx: number = 0.5 * (this.x + to.x);
      let vx: number = this.y - to.y;
      const my: number = 0.5 * (this.y + to.y);
      let vy: number = to.x - this.x;
      const len: number = Math.sqrt(vx * vx + vy * vy);
      vx = vx / len;
      vy = vy / len;
      ctx.line(this.x, this.y, to.x, to.y, e.used ? '#FFAC76' : e.active ? '#9B5AFF' : undefined, e.used ? 4 : e.active ? 3 : undefined);
      ctx.text('' + e.cost, mx + vx * this.s * 0.5, my + vy * this.s * 0.5, this.s, e.used ? '#FFAC76' : e.active ? '#9B5AFF' : undefined);
    });
  }
};
