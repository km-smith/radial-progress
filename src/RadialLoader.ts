import { html, css, LitElement, property, query, PropertyValues } from 'lit-element';

export class RadialLoader extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      color: var(--radial-loader-progress-color, red);
    }
  `;

  @property({type: Number}) height = 100;

  @property({type: Number}) width = 100;

  @property({type: Number}) lineWidth = 10;

  @property({type: Number}) percentComplete = 0;

  @query('#canvas', true)
  canvasElement?: HTMLCanvasElement;

  /**
   * Converts a degree (0 - 360) into a radian
   * @param deg A number between 0 and 360
   */
  convertDegToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Converts a percentage into a radian
   * @param percentage A number between 0 and 100
   */
  convertPercentageToRad(percentage: number): number {
    return this.convertDegToRad((percentage * 360) / 100);
  }

  /**
   * Draws an arc in the canvas based on the provided properties
   * @param ctx The 2d context of the canvas element
   */
  drawProgressArc(ctx?: CanvasRenderingContext2D) {
    if (!ctx) return;

    // Figure out the maximum radius of the arc
    const radius = (Math.min(ctx.canvas.width, ctx.canvas.height) / 2) - (this.lineWidth / 2);
    // Find the center of the canvas
    const originX = ctx.canvas.width / 2;
    const originY = ctx.canvas.height / 2;
    // ctx.arc expects radian for start and end. It also draws from the positive X
    // (3 on a clock). To make the arc draw from positive Y (12 on a clock) set the starting
    // point to the appropriate radian
    const start = this.convertDegToRad(270);

    // Delete everything on the canvas before drawing the progress arc
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    // Draw the arc
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = 'currentColor';
    ctx.arc(originX, originY, radius, start, this.convertPercentageToRad(this.percentComplete) + start);
    ctx.stroke();
  }

  render() {
    return html`
      <canvas id="canvas" width="${this.width}" height="${this.height}"></canvas>
    `;
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    if (!this.canvasElement) return;
    this.drawProgressArc(this.canvasElement.getContext('2d') ?? undefined);
  }
}
