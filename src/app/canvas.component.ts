import {
  Component, Output,EventEmitter,Input, ElementRef, AfterViewInit, ViewChild,SimpleChanges
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
})
export class CanvasComponent implements AfterViewInit {

position1: { x: number, y: number, color:string }={x:35,y:35, color:"blue"};
position2: { x: number, y: number, color:string }={x:375,y:375, color:"yellow"};
  @ViewChild('canvas') public canvas: ElementRef;
  @Input() public width = 400;
  @Input() public height = 400;
  @Input() public start = false;
  @Output() stopped = new EventEmitter();
  

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

   this.drawOnCanvas(this.position1);
   this.drawOnCanvas(this.position2);
  this.move();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.position1={x:35,y:35, color:"blue"};
    this.position2={x:375,y:375, color:"yellow"};
    this.move();
  }

private drawOnCanvas(pos: { x: number, y: number,color:string })
{

  this.cx.beginPath();
  this.cx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
      this.cx.fillStyle = pos.color;
      this.cx.fill();      
     this.cx.stroke();
}

move() {
  const max = this.cx.canvas.width / 6;
  const canvas = this.cx.canvas;
 
  let z=5;
  const i = setInterval(() => {
    this.cx.clearRect(0, 0, canvas.width, canvas.height);
    if(this.position1.x==this.position2.x &&
    this.position1.y==this.position2.y)
    {
      z=-1*z;
    }     
    this.position1.x+=z;
    this.position1.y+=z;
    this.position2.x-=z;
    this.position2.y-=z;
    this.drawOnCanvas(this.position1);
    this.drawOnCanvas(this.position2);
   
    if(this.position1.x==35 &&
    this.position1.y==35)    {
      clearInterval(i);   
      this.stopped.emit(); 
      }
   
  }, 60);    
}



}
