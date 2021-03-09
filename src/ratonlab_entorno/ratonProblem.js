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
        if (data.interations >= this.env.maxIterations) return true;
        if (minX == 0) {
            return true;
        }
        return false;
    }

    /**
     * The transition model.
     * Tells how to change the state (data) based on the given actions. You must override
     * In this case, the actions can be one the four movements or the TAKE action.
     * In this case, what changes based on the movement actions is the x or y position of the agent
     * or the current cell if the action is TAKE
     * @param {} data
     * @param {*} action
     * @param {*} agentID
     */
    update(data, action, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        //last action made
        let lastAction = this.memory[this.memory.length - 1];
        //add last action to memory arr
        this.memory.push(action);
        /*
        if (action == "DOWN" && lastAction == "UP") action = "UP";
        if (action == "LEFT" && lastAction == "RIGHT") action = "RIGHT";
        if (action == "UP" && lastAction == "DOWN") action = "DOWN";
        if (action == "RIGHT" && lastAction == "LEFT") action = "LEFT";

        if (action == "DOWN") agentState.y += 1;
        if (action == "LEFT") agentState.x -= 1;
        if (action == "UP") agentState.y -= 1;
        if (action == "RIGHT") agentState.x += 1;
        console.log(agentState);

        if (action == "TAKE") map[agentState.y][agentState.x] = 0;
        */
        if (action == "UP") {
            agentState.y -= 1;
        }
        if (action == "DOWN") {
            agentState.y += 1;
        }
        if (action == "LEFT") {
            agentState.x -= 1;
        }
        if (action == "RIGHT") {
            agentState.x += 1;
        }
        if (action == "TAKE") {
            map[agentState.y][agentState.x] = 0;
        }
        if (!data.interations) data.interations = 1;
        else data.interations++;

        console.log("ultima accion =>", lastAction);
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
        let x = agentState.x;
        let y = agentState.y;
        let mapa=agentState.mapa;
        let result = [];

        if(typeof mapa == 'undefined'){
            console.log('mapa no definido');
            agentState.mapa=Array.from(Array(1000), ()=> new Array(1000));
            for(var i=0;i<1000;i++){
                for(var j=0;j<1000;j++){
                    agentState.mapa[i][j]=0;
                }
            }
        }

        agentState.mapa[y][x]++;

        let resultTemp = [];
        let min,n;

        //LEFT
        if(x>0){
            if(map[y][x-1] ==1){
                agentState.mapa[y][x-1]=1000;
            }
            resultTemp.push(agentState.mapa[y][x-1])
        }else{
            resultTemp.push(1000);
        }

        //UP
        if(y>0){
            if(map[y-1][x] ==1){
                agentState.mapa[y-1][x]=1000;
            }
            resultTemp.push(agentState.mapa[y-1][x])
        }else{
            resultTemp.push(1000);
        }
        //RIGHT
        if(x< map[0].length -1){
            if(map[y][x+1]==1){
                agentState.mapa[y][x+1]=1000;
            }
            resultTemp.push(agentState.mapa[y][x+1]);
        }else{
            resultTemp.push(1000);
        }
        //DOWN
        if(y< map.length -1){
            if(map[y+1][x]==1){
                agentState.mapa[y+1][x]=1000;
            }
            resultTemp.push(agentState.mapa[y+1][x]);
        }else{
            resultTemp.push(1000);
        }

        n=0;
        min=resultTemp[n];
        for(let i=0;i<resultTemp.length;i++){
            if(resultTemp[i]<min){
                n=i;
                min=resultTemp[i];
            }
        }

        for(let i=0;i<resultTemp.length;i++){
            if(resultTemp[i]==min){
                result.push(0);
            }else{
                result.push(1);
            }
        }

        /*
        //LEFT
        result.push(x > 0 ? map[y][x - 1] : 1);
        //UP
        result.push(y > 0 ? map[y - 1][x] : 1);
        //RIGTH
        result.push(x < map[0].length - 1 ? map[y][x + 1] : 1);
        //DOWN
        result.push(y < map.length - 1 ? map[y + 1][x] : 1);
        */
        result = result.map((value) => (value > 0 ? 1 : 0));

        //SMELL
        result.push(Math.abs(map[y][x]));
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