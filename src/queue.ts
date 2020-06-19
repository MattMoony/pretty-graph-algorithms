export interface Pair<T1, T2> {
  first: T1;
  second: T2;
};

export class PriorityQueue<T1, T2> {
  q: Array<Pair<T1, T2>> = [];

  push (p: T1, i: T2): void {
    this.q.push({ first: p, second: i });
    this.q.sort((a: Pair<T1, T2>, b: Pair<T1, T2>) => <any> a.first - <any> b.first);
  }

  pop (): Pair<T1, T2> {
    return this.q.pop();
  }
};
