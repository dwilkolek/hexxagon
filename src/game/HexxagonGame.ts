import { Field } from "./Field";
import { Coordinates } from './Coordinates';
import { FieldValue } from './FieldValue.enum';

export class HexxagonGame {

    fields: Field[] = [];

    selectedField: null | Field = null;
    playerMoving: FieldValue;

    constructor(private size = 5) {
        const centerHex = new Coordinates(0, 0);
        this.playerMoving = FieldValue.PLAYER_1;
        for (let x = -size; x <= size; x++) {
            for (let y = -size; y <= size; y++) {
                const createdCoords: Coordinates = new Coordinates(x, y);
                if ((createdCoords.distanceTo(centerHex) <= size)) {
                    this.fields.push(new Field(createdCoords, FieldValue.EMPTY));
                }
            }
        }
        this.set(FieldValue.PLAYER_1, new Coordinates(0, -size));
        this.set(FieldValue.PLAYER_1, new Coordinates(size, 0));
        this.set(FieldValue.PLAYER_1, new Coordinates(-size, size));
        this.set(FieldValue.PLAYER_2, new Coordinates(-size, 0));
        this.set(FieldValue.PLAYER_2, new Coordinates(0, size));
        this.set(FieldValue.PLAYER_2, new Coordinates(size, -size));

        this.set(FieldValue.NOT_USABLE, new Coordinates(0, 2));
        this.set(FieldValue.NOT_USABLE, new Coordinates(-2, 0));
        this.set(FieldValue.NOT_USABLE, new Coordinates(2, -2));

    }

    set(player: FieldValue, coordinates: Coordinates) {
        this.getField(coordinates).fieldValue = player;
    }

    move(cFrom: Coordinates, cTo: Coordinates) {
        let from = this.getField(cFrom);
        let to = this.getField(cTo);
        if (to.fieldValue !== FieldValue.EMPTY) {
            throw new Error(`Cannot move there ${to}`);
        }
        let distance = from.distanceTo(to);
        if (distance === 1) {
            to.fieldValue = from.fieldValue;
        } else if (distance === 2) {
            to.fieldValue = from.fieldValue;
            from.fieldValue = FieldValue.EMPTY;
        } else {
            throw new Error(`too far away ${from} to ${to}`);
        }
        this.markAround(to);
    }

    getField(coordinates: Coordinates) {
        const field = this.fields.find(field => {
            return field.x === coordinates.x && field.y === coordinates.y;
        });
        if (!field) {
            throw new Error(`Field not found at (${coordinates.x}, ${coordinates.y})`);
        }
        return field;
    }


    getMoveOptions(coordinates: Coordinates, distance: number) {
        return this.fields.filter(f => {
            return coordinates.distanceTo(f) <= distance && f.fieldValue === FieldValue.EMPTY;
        })
    }

    moveToMarked(target: Field) {
        if (this.selectedField != null && target.marked > 0) {
            this.fields.forEach(f => f.marked = 0);
            this.move(this.selectedField, target);
            this.selectedField = null;
            this.playerMoving = this.playerMoving === FieldValue.PLAYER_1 ? FieldValue.PLAYER_2 : FieldValue.PLAYER_1;
        }
    }

    markMoveOptionsForField(field: Field) {
        if (field.fieldValue === this.playerMoving) {
            this.selectedField = field;
            this.fields.forEach(f => {
                let distance = field.distanceTo(f);
                f.marked = 0;
                if (f.fieldValue === FieldValue.EMPTY) {
                    if (distance === 1 || distance === 2) {
                        f.marked = distance;
                    }
                }
            });
        }
    }

    markAround(field: Field) {
        this.fields = this.fields.map(f => {
            if (field.distanceTo(f) === 1 && f.fieldValue !== FieldValue.EMPTY
                && (f.fieldValue === (field.fieldValue === FieldValue.PLAYER_1 ? FieldValue.PLAYER_2 : FieldValue.PLAYER_1))) {
                f.fieldValue = field.fieldValue;
            }
            return f;
        })
    }

    // getMapStats() {
    //     const stats = {};
    //     stats[FieldValue.EMPTY] = 0;
    //     stats[FieldValue.NOT_USABLE] = 0;
    //     stats[FieldValue.PLAYER_1] = 0;
    //     stats[FieldValue.PLAYER_2] = 0;
    //     this.fields.forEach(f => {
    //         stats[f.value]++;
    //     });
    //     return stats;
    // }

    // getMapInput(player) {
    //     return [player].concat(...this.fields.map(field => [
    //         field.x,
    //         field.y,
    //         field.value
    //     ]).flatMap(l => l))
    // }

}


export default HexxagonGame;