import { Coordinates } from './Coordinates';
import { FieldValue } from './FieldValue.enum';
export class Field extends Coordinates {

    id: string;

    marked: number = 0;

    constructor(_coordinates: Coordinates, private _value: FieldValue) {
        super(_coordinates.x, _coordinates.y);
        this.id = `(${this.x};${this.z};${this.y})`;
    }

    get fieldValue(): FieldValue {
        return this._value;
    }

    set fieldValue(value: FieldValue) {
        this._value = value;
    }

    w(size: number) {
        return 2 * size;
    }
    h(size: number) {
        return Math.sqrt(3) * size;
    }
    cx(size: number, ofx: number) {
        const w = this.w(size);
        const h = this.h(size);
        const x = this.x * 2*w*3/4
        return x + ofx;
    }
    cy(size: number, ofy: number) {
        const w = this.w(size);
        const h = this.h(size);
        const y = ((this.y-this.z)/2)*(2*h);
        return y + ofy;
    }
    svgPolygon(size: number, ofx: number, ofy: number) {
        const w = this.w(0.94*size);
        const h = this.h(0.94 * size);
        const y = this.cy(size, ofy);
        const x = this.cx(size, ofx);

        return `${x - w},${y} ` +
            `${x - 0.5 * w},${y - h} ` +
            `${x + 0.5 * w},${y - h} ` +
            `${x + w},${y} ` +
            `${x + 0.5 * w},${y + h} ` +
            `${x - 0.5 * w},${y + h} `;
    }

}

