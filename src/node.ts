import { Canvas } from './canvas';

export class Edge<T> {
  public from: Node<T>;
  public to: Node<T>;
  public cost: T;
  public active: boolean;
  public used: boolean;
  public consider: boolean;

  constructor (from: Node<T> = null, to: Node<T> = null, cost: T = null) {
    this.from = from;
    this.to = to;
    this.cost = cost;
    this.active = false;
    this.used = false;
    this.consider = false;
  }

  public toString (): string {
    return this.from + ' -> ' + this.to;
  }
}

const LETTERS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Node<T> {
  public x: number;
  public y: number;

  public active: boolean;
  public used: boolean;
  public consider: boolean;
  public prev: Edge<T>;
  public cost: number = Number.MAX_VALUE;
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

  public get id (): string {
    return this.l;
  }

  public addEdge (n: Node<T>|Edge<T>, c?: T): void {
    if (c && n instanceof Node) this.edges.push(new Edge(this, n, c));
    else this.edges.push(<Edge<T>> n);
  }

  public to (e: Edge<T>): Node<T> {
    return e.to !== this ? e.to : e.from;
  }

  private _trcUsed (p: Edge<T>, f: Node<T>, b: boolean): void {
    let c: Node<T> = this;
    while (c !== f) {
      c.used = b;
      p.used = b;
      [c, p] = [c.to(p), c.to(p).prev];
    }
    c.used = b;
  }

  public traceUsed (p: Edge<T>, f: Node<T>): void {
    this._trcUsed(p, f, true);
  }

  public untraceUsed (p: Edge<T>, f: Node<T>): void {
    this._trcUsed(p, f, false);
  }

  private _trcActive (p: Edge<T>, f: Node<T>, b: boolean): void {
    let c: Node<T> = this;
    while (c !== f) {
      c.active = b;
      p.active = b;
      [c, p] = [c.to(p), c.to(p).prev];
    }
    c.active = b;
  }

  public traceActive (p: Edge<T>, f: Node<T>): void {
    this._trcActive(p, f, true);
  }

  public untraceActive (p: Edge<T>, f: Node<T>): void {
    this._trcActive(p, f, false);
  }

  private _color (obj: Node<T>|Edge<T> = this, fill?: boolean): string {
    if (fill) return obj.used ? 'rgba(255, 172, 118, .15)' : obj.active ? 'rgba(155, 90, 255, .15)' : obj.consider ? 'rgba(255, 105, 123, .15)' : undefined;
    return obj.used ? '#FFAC76' : obj.active ? '#9B5AFF' : obj.consider ? '#FF697B' : undefined;
  }

  public draw (ctx: Canvas): void {
    ctx.circle(this.x, this.y, this.s, this._color(), this._color(this, true));
    ctx.text(this.l, this.x, this.y, this.s, this._color());
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
      ctx.line(this.x, this.y, to.x, to.y, this._color(e), e.used ? 1.2 : e.active ? 0.8 : e.consider ? 0.6 : undefined);
      ctx.text('' + e.cost, mx + vx * this.s * 0.5, my + vy * this.s * 0.5, this.s, this._color(e));
    });
  }

  public toString (): string {
    return this.l;
  }
};
