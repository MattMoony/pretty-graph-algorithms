export interface Pair<T1, T2> {
  first: T1;
  second: T2;
};

export class PriorityQueue<T1, T2> {
  private q: Array<Pair<T1, T2>> = [];

  public push (p: T1, i: T2): void {
    this.q.push({ first: p, second: i });
    this.q.sort((a: Pair<T1, T2>, b: Pair<T1, T2>) => <any> a.first - <any> b.first);
  }

  public pop (): Pair<T1, T2> {
    return this.q.pop();
  }

  public empty (): boolean {
    return this.length === 0;
  }

  public get length (): number {
    return this.q.length;
  }
};

export class UnionFind<T> {
  private m: Map<T, T> = new Map();
  private s: Map<T, number> = new Map();

  constructor (els: Array<T>) {
    for (const e of els) {
      this.m.set(e, e);
      this.s.set(e, 1);
    }
  }

  public find (e: T): T {
    if (this.m.get(e) === e) return e;
    const root: T = this.find(this.m.get(e));
    this.m.set(e, root);
    return root;
  }

  public union (a: T, b: T): void {
    a = this.find(a);
    b = this.find(b);
    if (this.s.get(a) < this.s.get(b)) [a, b] = [b, a];
    this.m.set(b, a);
    this.s.set(a, this.s.get(a) + this.s.get(b));
  }
};
