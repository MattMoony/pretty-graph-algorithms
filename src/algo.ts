import { Edge, Node } from './node';
import { Graph } from './graph';
import { Pair, PriorityQueue, UnionFind } from './utils';

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
    e.setConsider(true);
    await sleep();
    e.setConsider(false);
    e.active = true;
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
  const q: Array<Pair<Node<number>, Edge<number>>> = [{ first: from, second: new Edge() }];
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
  q.push(0, { first: from, second: new Edge() });
  while (!q.empty()) {
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
  q.push(0, { first: 0, second: { first: from, second: new Edge() } });
  while (!q.empty()) {
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

export async function bellmanFord (g: Graph<number>, ready: ()=>void) {
  const from: Node<number> = g.nodes[0];
  const to: Node<number> = g.nodes.slice(-1)[0];
  const edges: Array<Edge<number>> = g.edges;
  let change: boolean = true;
  from.cost = 0;
  for (let i = 0; i < edges.length - 1 && change; i++) {
    change = false;
    for (const e of edges) {
      e.setConsider(true);
      await sleep();
      if (e.from.cost + e.cost < e.to.cost) {
        e.setActive(true);
        e.to.cost = e.from.cost + e.cost;
        e.to.prev = e;
        await sleep();
        e.setActive(false);
        change = true;
      } else if (e.to.cost + e.cost < e.from.cost) {
        e.setActive(true);
        e.from.cost = e.to.cost + e.cost;
        e.from.prev = e;
        await sleep();
        e.setActive(false);
        change = true;
      }
      e.setConsider(false);
    }
  }
  if (to.prev) {
    let c: Node<number> = to;
    while (c !== from) {
      c.used = true;
      c.prev.used = true;
      c = c.to(c.prev);
    }
    c.used = true;
  }
  ready();
};

export async function floydWarshall (g: Graph<number>, ready: ()=>void) {
  const edges: Array<Edge<number>> = g.edges;
  const d: Array<Array<[number, number, number]>> = new Array(g.nodes.length).fill(null).map((a, i) => new Array(g.nodes.length).fill(null).map((b, j) => [i === j ? 0 : Number.MAX_VALUE, -1, -1]));
  const getPath: (f: number, t: number)=>Array<Edge<number>> = (f: number, t: number) => {
    let p: Array<Edge<number>> = [];
    let c: [number, number, number] = d[f][t];
    while (c[1] !== t && c[1] !== -1) {
      p.push(g.nodes[c[1]].edgeTo(g.nodes[c[2]]));
      if (c[1] === c[2]) {
        p.push(g.nodes[c[1]].edgeTo(g.nodes[d[c[1]][t][1]]));
        c = d[c[1]][t];
        continue;
      }
      c = d[c[1]][c[2]];
    }
    p = p.filter(e => e.from && e.to);
    return p.length > 0 ? p : [g.nodes[f].edgeTo(g.nodes[t])];
  };
  for (const e of edges) {
    const [u, v]: [number, number] = [g.nodes.indexOf(e.from), g.nodes.indexOf(e.to)];
    e.setConsider(true);
    await sleep();
    if (e.cost < d[u][v][0] || e.cost < d[v][u][0]) {
      e.setActive(true);
      if (e.cost < d[u][v][0]) {
        d[u][v] = [e.cost, v, v];
      }
      if (e.cost < d[v][u][0]) {
        d[v][u] = [e.cost, u, u];
      }
      await sleep();
      e.setActive(false);
    }
    e.setConsider(false);
  }
  for (let k = 0; k < g.nodes.length; k++) {
    for (let i = 0; i < g.nodes.length; i++) {
      for (let j = 0; j < g.nodes.length; j++) {
        const calcd = d[i][k][0] + d[k][j][0];
        const [ac, cb]: [Array<Edge<number>>, Array<Edge<number>>] = [getPath(i, k), getPath(k, j)];
        ac.forEach(e => e.setConsider(true));
        cb.forEach(e => e.setConsider(true));
        await sleep();
        if (calcd < d[i][j][0]) {
          ac.forEach(e => e.setActive(true));
          cb.forEach(e => e.setActive(true));
          d[i][j] = [calcd, i, k];
          await sleep();
          ac.forEach(e => e.setActive(false));
          cb.forEach(e => e.setActive(false));
        }
        ac.forEach(e => e.setConsider(false));
        cb.forEach(e => e.setConsider(false));
      }
    }
  }
  getPath(0, g.nodes.length - 1).forEach(e => e.setUsed(true));
  g.nodes.slice(-1)[0].used = true;
  ready();
};

export async function prims (g: Graph<number>, ready: ()=>void) {
  const mst: Array<Edge<number>> = [];
  const q: PriorityQueue<number, Pair<Node<number>, Edge<number>>> = new PriorityQueue();
  q.push(0, { first: g.nodes[0], second: new Edge() });
  var c: Pair<number, Pair<Node<number>, Edge<number>>>;
  while (!q.empty()) {
    c = q.pop();
    if (c.second.second.from) {
      c.second.second.active = true;
    }
    await sleep();
    if (c.second.first.active) {
      c.second.second.active = false;
      continue;
    }
    c.second.first.active = true;
    if (c.second.second.from) mst.push(c.second.second);
    if (mst.length === g.nodes.length - 1) break;
    for (const e of c.second.first.edges) {
      if (c.second.first.to(e).active) continue;
      e.consider = true;
      c.second.first.to(e).consider = true;
      q.push(-e.cost, { first: c.second.first.to(e), second: e });
      await sleep();
      e.consider = false;
      c.second.first.to(e).consider = false;
    }
  }
  for (const e of mst) {
    e.from.used = true;
    e.to.used = true;
    e.used = true;
  }
  if (mst.length < g.nodes.length - 1) g.reset();
  ready();
};

export async function kruskals (g: Graph<number>, ready: ()=>void) {
  const mst: Array<Edge<number>> = [];
  const edges: Array<Edge<number>> = [...new Set(g.nodes.map(n => n.edges).flat())];
  edges.sort((a: Edge<number>, b: Edge<number>) => a.cost - b.cost);
  const krusk: UnionFind<string> = new UnionFind(g.nodes.map(n => n.id));
  let c: Edge<number>;
  while (edges.length > 0) {
    c = edges.shift();
    c.setConsider(true);
    await sleep();
    c.setConsider(false);
    if (krusk.find(c.from.id) === krusk.find(c.to.id)) continue;
    krusk.union(c.from.id, c.to.id);
    c.setActive(true);
    mst.push(c);
    if (mst.length === g.nodes.length - 1) break;
  }
  mst.forEach(e => e.setUsed(true));
  if (mst.length < g.nodes.length - 1) g.reset();
  ready();
};

const def: {[index: string]: (g: Graph<number>, ready: ()=>void)=>void} = {
  dfs: dfs,
  bfs: bfs,
  dijkstra: dijkstra,
  aStar: aStar,
  bellmanFord: bellmanFord,
  floydWarshall: floydWarshall,
  prims: prims,
  kruskals: kruskals
};

export default def;
