import { Edge, Node } from './node';
import { Graph } from './graph';
import { Pair, PriorityQueue } from './queue';

const TIMEOUT: number = 300;

function sleep (ms: number): Promise<void> {
  return new Promise((resolve, reject) => window.setTimeout(resolve, ms));
}

async function _dfs (c: Node<number>, t: Node<number>, p: Array<Node<number>>) {
  p.push(c);
  if (c.active) return; 
  c.active = true;
  await sleep(TIMEOUT);
  if (c === t) {
    c.used = true;
    return;
  }
  for (const e of c.edges) {
    if (e.active) continue;
    const to: Node<number> = c.to(e);
    e.active = true;
    await sleep(TIMEOUT);
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
  const q: Array<Pair<Node<number>, Edge<number>>> = [{ first: from, second: null }];
  let c: Pair<Node<number>, Edge<number>>;
  while (q.length > 0) {
    c = q.shift();
    if (c.second) {
      c.first.to(c.second).active = true;
      c.second.active = true;
    }
    await sleep(TIMEOUT);
    if (c.first.prev) {
      c.second.active = false;
      continue;
    }
    c.first.active = true;
    c.first.prev = c.second;
    c.first.edges.forEach(e => {
      if (c.first.to(e).prev) return;
      q.push({ first: c.first.to(e), second: e });
    });
    if (c.first === to) break;
    if (c.second) {
      c.first.to(c.second).active = false;
      c.second.active = false;
    }
    c.first.active = false;
  }
  if (c.first === to) {
    while (c.first !== from) {
      c.first.used = true;
      c.second.used = true;
      await sleep(TIMEOUT);
      c = { first: c.first.to(c.second), second: c.first.to(c.second).prev };
    }
    c.first.used = true;
  }
  ready();
};

export async function dijkstra (g: Graph<number>, ready: ()=>void) {
  ready();
};

export function aStar (g: Graph<number>, ready: ()=>void): void {
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
