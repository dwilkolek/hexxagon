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

        this.set(FieldValue.NOT_USABLE, new Coordinates(0, 1));
        this.set(FieldValue.NOT_USABLE, new Coordinates(-1, 0));
        this.set(FieldValue.NOT_USABLE, new Coordinates(1, -1));

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
        this.takeOverNeighbours(to);
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

    swapPlayerMoving() {
        this.playerMoving = this.playerMoving === FieldValue.PLAYER_1 ? FieldValue.PLAYER_2 : FieldValue.PLAYER_1;
    }

    async moveToMarked(target: Field) {
        if (this.selectedField != null && target.marked > 0) {
            this.fields.forEach(f => f.marked = 0);
            this.move(this.selectedField, target);
            this.selectedField = null;
            this.swapPlayerMoving();
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

    takeOverNeighbours(field: Field) {
        this.fields = this.fields.map(f => {
            if (field.distanceTo(f) === 1 && f.fieldValue !== FieldValue.EMPTY
                && (f.fieldValue === (field.fieldValue === FieldValue.PLAYER_1 ? FieldValue.PLAYER_2 : FieldValue.PLAYER_1))) {
                f.fieldValue = field.fieldValue;
            }
            return f;
        })
    }


    async makeCPUMove() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const opts = this.fields.filter(field => field.fieldValue === this.playerMoving && this.getMoveOptions(field, 2).length > 0);
                const chosenGem = Math.round(Math.random() * (opts.length - 1));
                const moveOptions = this.getMoveOptions(opts[chosenGem], 2)
                const chosenMove = Math.round(Math.random() * (moveOptions.length - 1));
                this.move(opts[chosenGem], moveOptions[chosenMove]);
                this.swapPlayerMoving();
                resolve();
            }, Math.random() * 3 * 1000);
        })

    }

    isGameFinished() {
        const p1 = this.fields.filter(f => f.fieldValue === FieldValue.PLAYER_1).length;
        const p2 = this.fields.filter(f => f.fieldValue === FieldValue.PLAYER_2).length;
        const empty = this.fields.filter(f => f.fieldValue === FieldValue.EMPTY).length;

        if (empty === 0 || p1 === 0 || p2 ===0) {
            return true;
        }
    }
    getPoints() {
        const p1 = this.fields.filter(f => f.fieldValue === FieldValue.PLAYER_1).length;
        const p2 = this.fields.filter(f => f.fieldValue === FieldValue.PLAYER_2).length;
        return {
            1: p1,
            2: p2,
            winner: p1 === p2 ? null : (p1 > p2 ? FieldValue.PLAYER_1 : FieldValue.PLAYER_2)
        }
    }
}


export default HexxagonGame;