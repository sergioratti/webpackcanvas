import { fromEvent } from 'rxjs'

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('maincanvas');
let ctx = canvas ? canvas.getContext('2d') : null;

let lastX = 100;
let lastY = 100;

let fix_dpi = function () {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    if (!canvas)
        return;
    let dpi = window.devicePixelRatio;
    let style_height = Number(+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2));
    //get CSS width
    let style_width = Number(+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2));
    //scale the canvas

    // let w = window.innerWidth-30;
    // let h = w*3/7;

    // canvas.height = h;
    // canvas.width = w;
    // canvas.style.width = `${w}px`;
    // canvas.style.height = `${h}px`;
    canvas.setAttribute('height', `${style_height * dpi}`);
    canvas.setAttribute('width', `${style_width * dpi}`);
}

let draw = function () {
    fix_dpi();
    if (ctx) {
        let maxX = canvas.width;
        let maxY = canvas.height;
        ctx.clearRect(0,0,maxX,maxY);
        let step = 20;
        ctx.beginPath();
        ctx.strokeStyle = 'grey'
        ctx.lineWidth = 1;
        for(let i=0;i<maxX;i+=step){

            ctx.moveTo(i+0.5, 0);
            ctx.lineTo(i+0.5, maxY)
        }
        for(let i=0;i<maxY;i+=step){

            ctx.moveTo(0, i+0.5);
            ctx.lineTo(maxX, i+0.5)
        }
        ctx.stroke();
        ctx.strokeStyle = '#030303';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.lineTo(lastX,lastY);
        ctx.stroke();
    }
    window.requestAnimationFrame(draw);
}

fromEvent(canvas,'mousemove')
.subscribe((e:any)=>{
    lastX = e.offsetX * window.devicePixelRatio;
    lastY = e.offsetY * window.devicePixelRatio;
});

draw();