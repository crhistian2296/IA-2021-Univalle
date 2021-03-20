console.time();
const bfs = require("./bfs");
const dfs = require("./dfs")

// Constantes del problema
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];
/* const map = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
] */

const start = {
    x: 1,
    y: 7
};
const solution = {
    x: 6,
    y: 6
};
const actions = ['L', 'U', 'R', 'D'];
const costs = [1, 1, 1, 1];

//let nodo = {value: {x: 2, y: 6}, actions: 'RU', level: 2};

function isSolution(nodo, constantes) {
    let solution = constantes.solution;
    if (nodo.value.x == solution.x &&
        nodo.value.y == solution.y)
        return true;
    return false;
}

function getChildren(nodo, constantes) {
    let map = constantes.map;
    let children = []
    // Left
    if (nodo.value.x >= 1 && map[nodo.value.y][nodo.value.x - 1] == 0) {
        children.push({
            value: {
                x: nodo.value.x - 1,
                y: nodo.value.y
            },
            actions: nodo.actions + 'L',
            level: nodo.level + 1
        });
    }
    // Up
    if (nodo.value.y >= 1 && map[nodo.value.y - 1][nodo.value.x] == 0) {
        children.push({
            value: {
                x: nodo.value.x,
                y: nodo.value.y - 1
            },
            actions: nodo.actions + 'U',
            level: nodo.level + 1
        });
    }
    // Right
    if (nodo.value.x < map[0].length - 1 && map[nodo.value.y][nodo.value.x + 1] == 0) {
        children.push({
            value: {
                x: nodo.value.x + 1,
                y: nodo.value.y
            },
            actions: nodo.actions + 'R',
            level: nodo.level + 1
        });
    }
    // Down
    if (nodo.value.y < map.length - 1 && map[nodo.value.y + 1][nodo.value.x] == 0) {
        children.push({
            value: {
                x: nodo.value.x,
                y: nodo.value.y + 1
            },
            actions: nodo.actions + 'D',
            level: nodo.level + 1
        });
    }

    return children;
}



let constantes = {
    map,
    solution,
    start,
    actions,
    costs
}
let root = {
    value: constantes.start,
    actions: '',
    level: 0
};

let children = getChildren(root, constantes);

console.log(children)

console.log(children.length == 2);
console.log(children[0].actions == 'R');
console.log(children[0].value.x == root.value.x + 1);
console.log(children[0].value.y == root.value.y);
console.log(children[0].level == 1);
console.log(children[1].actions == 'D');
console.log(children[1].value.x == root.value.x);
console.log(children[1].value.y == root.value.y + 1);
console.log(children[1].level == 1);

console.log(isSolution(children[1], constantes) == false);

let problem = {
    constantes,
    isSolution,
    getChildren
}

let solutionProblem = dfs(problem);

console.log(solutionProblem); // "RUUUUU"
console.timeEnd();