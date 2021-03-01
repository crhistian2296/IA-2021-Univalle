const Agent = require("../core/Agent");

/**
 * Simple reflex agent. Search for an object whithin a labyrinth.
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,1,0": "UP",
            "0,0,1,0,0": "UP",
            "0,0,1,1,0": "LEFT",
            "0,1,0,0,0": "LEFT",
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "LEFT",
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "UP",
            "1,0,0,1,0": "RIGHT",
            "1,0,1,0,0": "DOWN",
            "1,0,1,1,0": "UP",
            "1,1,0,0,0": "RIGHT",
            "1,1,0,1,0": "RIGHT",
            "1,1,1,0,0": "DOWN",
            default: "TAKE",
        };
    }

    setup(state0) {
        this.x = state0.raton.x;
        this.y = state0.raton.y;
        this.queso0 = state0.queso;
    }

    /**
     * We override the send method.
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        //this.perception = [LEFT, UP, RIGHT, DOWN, SMELL, ratonx, ratony, qx, qy]

        let ratonX = this.perception[6];
        let ratonY = this.perception[7];
        let quesoX = this.perception[8];
        let quesoY = this.perception[9];
        let viewKey = this.perception.slice(0, 5).join();
        console.log(viewKey);
        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;

        if (this.table[viewKey]) {
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }
    }
}

module.exports = CleanerAgent;