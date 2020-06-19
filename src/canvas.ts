export class Canvas {
  private can: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private cvf: number = 100;
  private neu: string = '#DEF2FF';

  constructor (can: HTMLCanvasElement) {
    this.can = can;
    this.ctx = can.getContext('2d');
  }

  public get width (): number {
    return this.can.width;
  }

  public set width (w: number) {
    this.can.width = w;
  }

  public get height (): number {
    return this.can.height;
  }

  public set height (h: number) {
    this.can.height = h;
  }

  private cv (u: number): number {
    if (this.can.width < this.can.height) return this.cvx(u);
    return this.cvy(u);
  }

  private dv (u: number): number {
    if (this.can.width < this.can.height) return this.dvx(u);
    return this.dvy(u);
  }

  private cvx (u: number): number {
    let f: number = this.cvf;
    if (this.can.width < this.can.height) f = (this.can.width / this.can.height) * this.cvf;
    return this.can.width / f * u;
  }
  
  private dvx (u: number): number {
    let f: number = this.cvf;
    if (this.can.width < this.can.height) f = (this.can.width / this.can.height) * this.cvf;
    return (u * f) / this.can.width;
  }

  private cvy (u: number): number {
    let f: number = this.cvf;
    if (this.can.height < this.can.width) f = (this.can.height / this.can.width) * this.cvf;
    return this.can.height / this.cvf * u;
  }
  
  private dvy (u: number): number {
    let f: number = this.cvf;
    if (this.can.height < this.can.width) f = (this.can.height / this.can.width) * this.cvf;
    return (u * f) / this.can.height;
  }

  public circle (cx: number, cy: number, sz: number, c: string = '#000', cb: string = 'rgba(0,0,0,.15)'): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.neu;
    this.ctx.ellipse(this.cvx(cx), this.cvy(cy), this.cv(sz), this.cv(sz), 0, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.strokeStyle = c;
    this.ctx.fillStyle = cb;
    this.ctx.ellipse(this.cvx(cx), this.cvy(cy), this.cv(sz), this.cv(sz), 0, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  public text (txt: string, cx: number, cy: number, sz: number, c: string = '#000'): void {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${this.cv(sz)}px sans-serif`;
    this.ctx.fillStyle = c;
    this.ctx.fillText(txt, this.cvx(cx), this.cvy(cy));
  }

  public line (fx: number, fy: number, tx: number, ty: number, c: string = '#555', w: number = 1): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = c;
    this.ctx.moveTo(this.cvx(fx), this.cvy(fy));
    this.ctx.lineTo(this.cvx(tx), this.cvy(ty));
    this.ctx.closePath();
    this.ctx.stroke();
  }

  public clear (): void {
    this.ctx.clearRect(0, 0, this.can.width, this.can.height);
  }

  public getBoundingClientRect (): DOMRect {
    return this.can.getBoundingClientRect();
  }
};
