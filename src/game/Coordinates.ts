export class Coordinates {

    constructor(private _x: number, private _z: number) {}
    get x() {
        return this._x;
    }
    get z() {
        return this._z;
    }
    get y() {
        return 0 - this.x - this.z;
    }

    distanceTo(coordinates: Coordinates) {
        return Math.max(
            Math.abs(this.x - coordinates.x),
            Math.abs(this.y - coordinates.y),
            Math.abs(this.z - coordinates.z)
        );
    }

}