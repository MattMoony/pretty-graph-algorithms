export interface Pair<T1, T2> {
  first: T1;
  second: T2;
};

export class PriorityQueue<T1, T2> {
  q: Array<Pair<T1, T2>> = [];

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
