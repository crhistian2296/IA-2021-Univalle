const Problem = require("../core/Problem");

/**
 * Simple reflex agent problem. Define a problem to be solved by a simple reflex agent
 */
class CleanerProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
        this.memory = [];
    }

    /**
     * Check if the given solution solves the problem. You must override.
     * The current state of the enviroment is maintained in data.world
     * @param {Object} solution
     */
    goalTest(data) {
        let minX = min(data.world);
        if (data.iterations >= this.env.maxIterations) return true;
        if (minX == 0) {
            return true;
        }
        return false;
    }

    manhatanDistance(ratX, ratY, cheeseX, cheeseY) {
        let distance = (cheeseX - ratX) + (cheeseY - ratY)
        return distance
    }

    /**
     * The transition model.
     * Tells how to change the state (data) based on the given actions. You must override
     * In this case, the actions can be one the four movements or the TAKE action.
     * In this case, what changes based on the movement actions is the x or y position of the agent
     * or the current cell if the action is TAKE
     * @param {} data
     * @param {*} action
     * @param {*} agentID//dlsfjsd
     */
    update(data, action, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        let ratonX = Number(JSON.stringify(agentState.raton.x));
        let ratonY = Number(JSON.stringify(agentState.raton.y));
        let quesoX = Number(JSON.stringify(agentState.queso.x));
        let quesoY = Number(JSON.stringify(agentState.queso.y));
        let lastAction = this.memory[this.memory.length - 1];

        this.memory.push(action);
        //add last action to memory arr

        //Para que mantenga la direccion sin devolverse
        if ((Math.abs(quesoY - --ratonY) + Math.abs(quesoX - ratonX)) > (Math.abs(quesoY - ++ratonY) + Math.abs(quesoX - ratonX)))
            action = 'DOWN'

        if ((Math.abs(quesoY - --ratonY) + Math.abs(quesoX - ratonX)) < (Math.abs(quesoY - ++ratonY) + Math.abs(quesoX - ratonX)))
            action = 'UP'

        if ((Math.abs(quesoY - ratonY) + Math.abs(quesoX - --ratonX)) > (Math.abs(quesoY - ratonY) + Math.abs(quesoX - ++ratonX)))
            action = 'RIGHT'

        if ((Math.abs(quesoY - ratonY) + Math.abs(quesoX - --ratonX)) < (Math.abs(quesoY - ratonY) + Math.abs(quesoY - ratonY)))
            action = 'LEFT'


        if (action == "DOWN" && lastAction == "UP") 
            action = "UP";
        if (action == "LEFT" && lastAction == "RIGHT") 
            action = "RIGHT";
        if (action == "UP" && lastAction == "DOWN") 
            action = "DOWN";
        if (action == "RIGHT" && lastAction == "LEFT") 
            action = "LEFT";


        //Accion arriba, camino mas corto arriba
        if (action == "UP")
            agentState.raton.y -= 1;


        //Accion abajo, camino más corto abajo
        if (action == "DOWN")
            agentState.raton.y += 1;


        //Accion izquierda, camino más corto izquierda
        if (action == "LEFT")
            agentState.raton.x -= 1;

        //Accion derecha, camino mas corto derecha

        if (action == "RIGHT")
            agentState.raton.x += 1;


        /* if (action == "DOWN" && lastAction == "UP") action = "UP";
        if (action == "DOWN" && lastAction != "UP") {
            if (Math.abs(quesoY - --ratonY) >= Math.abs(quesoY - ++ratonY)) {
                agentState.raton.y += 1;
            } else {
                action = "UP"
            }
        }

        if (action == "LEFT" && lastAction == "RIGHT") action = "RIGHT";
        if (action == "LEFT" && lastAction != "RIGHT") {
            if (Math.abs(quesoX - --ratonX) >= Math.abs(quesoX - ++ratonX)) {
                agentState.raton.x -= 1;
            } else {
                action = "RIGHT"
            }
        }

        if (action == "UP" && lastAction == "DOWN") action = "UP";
        if (action == "UP" && lastAction != "DOWN") {
            if (Math.abs(quesoY - --ratonY) <= Math.abs(quesoY - ++ratonY)) {
                agentState.raton.y -= 1;
            } else {
                action = "DOWN"
            }
        }

        if (action == "RIGHT" && lastAction == "LEFT") action = "LEFT";
        if (action == "RIGHT" && lastAction != "LEFT") {
            if (Math.abs(quesoX - --ratonX) <= Math.abs(quesoX - ++ratonX)) {
                agentState.raton.x += 1;
            } else {
                action = "LEFT"
            }
        } */

        console.log(agentState.raton);

        if (action == "TAKE")
            map[agentState.raton.y][agentState.raton.x] = 0;

        if (!data.iterations)
            data.iterations = 1;
        else
            data.iterations++;


        console.log('ultima accion =>', lastAction);
    }


    /**
     * Gives the world representation for the agent at the current stage.
     * Notice that the agent don't have access to the whole labyrinth. It only "see"
     * the cell around and under it.
     * @param {*} agentID
     * @returns and object with the information to be sent to the agent
     */
    perceptionForAgent(data, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        let x = agentState.raton.x;
        let y = agentState.raton.y;
        let result = [];
        //LEFT
        result.push(x > 0 ? map[y][x - 1] : 1);
        //UP
        result.push(y > 0 ? map[y - 1][x] : 1);
        //RIGTH
        result.push(x < map[0].length - 1 ? map[y][x + 1] : 1);
        //DOWN
        result.push(y < map.length - 1 ? map[y + 1][x] : 1);

        result = result.map((value) => (value > 0 ? 1 : 0));

        //SMELL
        result.push(Math.abs(map[y][x]));

        // Pasar la información sobre donde está el queso

        return result;
    }

    /**
     * Solve the given problem. We don't need to change in this case
     * @param {*} problem
     * @param {*} callbacks
     */
    /*solve(problem, callbacks) {
        this.controller.setup({ world: problem, problem: this });
        this.controller.start(callbacks);
    }*/
}

module.exports = CleanerProblem;

function min(data) {
    let min = 9999999;
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        for (j = 0; j < row.length; j++) {
            if (row[j] < min) {
                min = row[j];
            }
        }
    }
    return min;
}