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
            "0,0,1,1,0": "UP",
            "0,1,0,0,0": "RIGHT",
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "LEFT",
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "RIGHT",
            "1,0,0,1,0": "RIGHT",
            "1,0,1,0,0": "DOWN",
            "1,0,1,1,0": "UP",
            "1,1,0,0,0": "DOWN",
            "1,1,0,1,0": "RIGHT",
            "1,1,1,0,0": "DOWN",
            default: "TAKE",
        };
        this.mapa=Array.from(Array(20), ()=> new Array(20));
        for(let i=0;i<20;i++){
            for(let j=0;j<20;j++){
                this.mapa[i][j]=0;
            }
        }
    }

    setup(state0) {
        this.x = state0.x;
        this.y = state0.y;
        this.mapa;
    }

    /**
     * We override the send method.
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        let viewKey = this.perception.join();
        console.log(viewKey);
        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;
        this.mapa[this.y][this.x]++;
        if (this.table[viewKey]) {
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }
    }
}

module.exports = CleanerAgent;