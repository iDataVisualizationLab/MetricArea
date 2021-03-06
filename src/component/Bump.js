import { path } from 'd3-path';

class Bump  {
    x =0;
    _x = true;
    _context = path();
    _line=0;
    _point=0;
    _x0 = 0;
    _y0 = 0;
    constructor(context, x) {
        this._context = context;
        this._x = x;
    }

    areaStart() {
        this._line = 0;
    }
    areaEnd() {
        this._line = NaN;
    }
    lineStart() {
        this._point = 0;
    }
    lineEnd() {
        if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
        this._line = 1 - this._line;
    }
    point(x, y) {
        x = +x;
        y = +y;
        switch (this._point) {
            case 0: {
                this._point = 1;
                if (this._line) this._context.lineTo(x, y);
                else this._context.moveTo(x, y);
                break;
            }
            case 1: this._point = 2; // falls through
            default: {
                if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
                else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
                break;
            }
        }
        this._x0 = x;
        this._y0 = y;
    }
}


export function bumpX(context) {
    return new Bump(context, true);
}

export function bumpY(context) {
    return new Bump(context, false);
}
