import { Edge, Node, nullEdge } from './node';
import { Graph } from './graph';
import { Pair, PriorityQueue } from './queue';

var TIMEOUT: number = 300;

export function setPause (timeout: number): void {
  TIMEOUT = timeout;
}

function sleep (ms: number = TIMEOUT): Promise<void> {
  return new Promise((resolve, reject) => window.setTimeout(resolve, ms));
}

async function _dfs (c: Node<number>, t: Node<number>, p: Array<Node<number>>) {
  p.push(c);
  if (c.active) return;
  c.active = true;
  await sleep();
  if (c === t) {
    c.used = true;
    return;
  }
  for (const e of c.edges) {
    if (e.active) continue;
    const to: Node<number> = c.to(e);
    e.active = true;
    await sleep();
    await _dfs(to, t, p);
    if (p.slice(-1)[0] === t) {
      e.used = true;
      break;
    }
    e.active = false;
    p.pop();
  }
  if (p.slice(-1)[0] !== t) {
    c.active = false;
    return;
  }
  c.used = true;
}

export async function dfs (g: Graph<number>, ready: ()=>void) {
  await _dfs(g.nodes[0], g.nodes.slice(-1)[0], []);
  ready();
};

export async function bfs (g: Graph<number>, ready: ()=>void) {
  const from: Node<number> = g.nodes[0];
  const to: Node<number> = g.nodes.slice(-1)[0];
  const q: Array<Pair<Node<number>, Edge<number>>> = [{ first: from, second: nullEdge() }];
  let c: Pair<Node<number>, Edge<number>>;
  while (q.length > 0) {
    c = q.shift();
    if (c.second.from) {
      c.first.to(c.second).active = true;
      c.second.active = true;
      c.first.traceActive(c.second, from);
    }
    await sleep();
    if (c.first.prev) {
      c.second.active = false;
      c.first.untraceActive(c.second, from);
      continue;
    }
    c.first.prev = c.second;
    if (c.first === to) break;
    for (const e of c.first.edges) {
      if (c.first.to(e).prev) continue;
      e.consider = true;
      c.first.to(e).consider = true;
      q.push({ first: c.first.to(e), second: e });
      await sleep();
      e.consider = false;
      c.first.to(e).consider = false;
    }
    if (c.second.from) {
      c.first.to(c.second).active = false;
      c.second.active = false;
      c.first.untraceActive(c.second, from);
    }
  }
  if (c.first === to) {
    c.first.traceUsed(c.second, from);
  }
  ready();
};

export async function dijkstra (g: Graph<number>, ready: ()=>void) {
  const from: Node<number> = g.nodes[0];
  const to: Node<number> = g.nodes.slice(-1)[0];
  const q: PriorityQueue<number, Pair<Node<number>, Edge<number>>> = new PriorityQueue();
  var c: Pair<number, Pair<Node<number>, Edge<number>>>;
  q.push(0, { first: from, second: nullEdge() });
  while (q.length > 0) {
    c = q.pop();
    if (c.second.second.from) {
      c.second.first.to(c.second.second).active = true;
      c.second.second.active = true;
      c.second.first.traceActive(c.second.second, from);
    }
    await sleep();
    if (c.second.first.prev) {
      c.second.second.active = false;
      c.second.first.untraceActive(c.second.second, from);
      continue;
    }
    c.second.first.prev = c.second.second;
    if (c.second.first === to) break;
    for (const e of c.second.first.edges) {
      if (c.second.first.to(e).prev) continue;
      e.consider = true;
      c.second.first.to(e).consider = true;
      q.push(c.first - e.cost, { first: c.second.first.to(e), second: e });
      await sleep();
      e.consider = false;
      c.second.first.to(e).consider = false;
    }
    if (c.second.second.from) {
      c.second.first.to(c.second.second).active = false;
      c.second.second.active = false;
      c.second.first.untraceActive(c.second.second, from);
    }
  }
  if (c.second.first === to) {
    c.second.first.traceUsed(c.second.second, from);
  }
  ready();
};

export async function aStar (g: Graph<number>, ready: ()=>void) {
  const from: Node<number> = g.nodes[0];
  const to: Node<number> = g.nodes.slice(-1)[0];
  const q: PriorityQueue<number, Pair<number, Pair<Node<number>, Edge<number>>>> = new PriorityQueue();
  var c: Pair<number, Pair<number, Pair<Node<number>, Edge<number>>>>;
  q.push(0, { first: 0, second: { first: from, second: nullEdge() } });
  while (q.length > 0) {
    c = q.pop();
    if (c.second.second.second.from) {
      c.second.second.first.to(c.second.second.second).active = true;
      c.second.second.second.active = true;
      c.second.second.first.traceActive(c.second.second.second, from);
    }
    await sleep();
    if (c.second.second.first.prev) {
      c.second.second.second.active = false;
      c.second.second.first.untraceActive(c.second.second.second, from);
      continue;
    }
    c.second.second.first.prev = c.second.second.second;
    if (c.second.second.first === to) break;
    for (const e of c.second.second.first.edges) {
      if (c.second.second.first.to(e).prev) continue;
      const t: Node<number> = c.second.second.first.to(e);
      e.consider = true;
      t.consider = true;
      const g: number = c.first + c.second.first - e.cost;
      const h: number = Math.sqrt(Math.pow(t.x - to.x, 2) + Math.pow(t.y - to.y, 2));
      q.push(g - h, { first: h, second: { first: t, second: e } });
      await sleep();
      e.consider = false;
      t.consider = false;
    }
    if (c.second.second.second.from) {
      c.second.second.first.to(c.second.second.second).active = false;
      c.second.second.second.active = false;
      c.second.second.first.untraceActive(c.second.second.second, from);
    }
  }
  if (c.second.second.first === to) {
    c.second.second.first.traceUsed(c.second.second.second, from);
  }
  ready();
};

export function prims (g: Graph<number>, ready: ()=>void): void {
  ready();
};

export function kruskals (g: Graph<number>, ready: ()=>void): void {
  ready();
};

const def: {[index: string]: (g: Graph<number>, ready: ()=>void)=>void} = {
  dfs: dfs,
  bfs: bfs,
  dijkstra: dijkstra,
  aStar: aStar,
  prims: prims,
  kruskals: kruskals
};

export default def;
