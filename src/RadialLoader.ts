import { html, css, LitElement, property, query, PropertyValues } from 'lit-element';

export class RadialLoader extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  // The diameter of the progress bar arc in pixels
  @property({type: Number}) diameter = 100;

  // The width of the progress bar arc in pixels
  @property({type: Number}) progressBarLineWidth = 10;

  // Number form 0 to 100 which controls the percent complete of the progress bar arc
  @property({type: Number}) percentComplete = 0;

  // Reference to the canvas element
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
   */
  drawProgressArc() {
    if (!this.canvasElement) return;
    const ctx = this.canvasElement.getContext('2d');
    if (!ctx) return;
    const canvasElementStyles = getComputedStyle(this.canvasElement);
    // Figure out the maximum radius of the arc
    const radius = (Math.min(ctx.canvas.width, ctx.canvas.height) / 2) - (this.progressBarLineWidth / 2);
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
    ctx.lineWidth = this.progressBarLineWidth;
    ctx.strokeStyle = canvasElementStyles?.getPropertyValue('--progress-stroke-color') ?? 'black';
    ctx.arc(originX, originY, radius, start, this.convertPercentageToRad(this.percentComplete) + start);
    ctx.stroke();
  }

  render() {
    return html`
      <canvas id="canvas" width="${this.diameter}" height="${this.diameter}"></canvas>
    `;
  }

  // After any update redraw the progress bar arc
  updated(changed: PropertyValues) {
    super.updated(changed);
    this.drawProgressArc();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "radial-loader": RadialLoader;
  }
}
