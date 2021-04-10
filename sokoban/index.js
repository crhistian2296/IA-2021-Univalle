const bfs = require("./bfs");
const fs = require('fs')
const path = require('path')

var map = []

var start = { x: 0, y: 2 };
var solution = []; //{ x: 3, y: 1 }
var boxes = [] //Guarda las posiciones de las cajas
const actions = ['L', 'U', 'R', 'D'];
const costs = [1, 1, 1, 1];

//let nodo = {value: {x: 2, y: 6}, actions: 'RU', level: 2};

function isSolution(nodo, constantes) {
    let solution = constantes.solution;
    let boxes = nodo.boxes;
    let contador = 0; //si es solucion, al final debe ser igual al tamaño de boxes
    for (let i = 0; i < boxes.length; i++) {
       for (let j = 0; j < boxes.length; j++) {
           if(boxes[i].x == solution[j].x && boxes[i].y == solution[j].y ){
               contador++;
           }
       }
    }

    if (contador==boxes.length)
        return true;
    return false;
}

function getChildren(nodo, constantes) {
    let map = constantes.map;
    let children = []
    // Left
    if (nodo.value.x >= 1 && map[nodo.value.y][nodo.value.x - 1] != 'W') {
        if (map[nodo.value.y][nodo.value.x - 2] != 'W' && map[nodo.value.y][nodo.value.x - 1] == 'C') {
            //logica para modificar las posiciones de las cajas en la variable boxes
        }
        children.push({value: {x: nodo.value.x - 1,
                               y: nodo.value.y},
                        actions: nodo.actions + 'L',
                        level: nodo.level + 1
        });
    }
    // Up
    if (nodo.value.y >= 1 && map[nodo.value.y - 1][nodo.value.x] != 'W') {
        if (map[nodo.value.y - 2][nodo.value.x] != 'W' && map[nodo.value.y - 1][nodo.value.x] == 'C') {
            //logica para modificar las posiciones de las cajas en la variable boxes
        }

        children.push({value: {x: nodo.value.x,
                               y: nodo.value.y - 1},
                        actions: nodo.actions + 'U',
                        level: nodo.level + 1
        });
    }
    // Right
    if (nodo.value.x < map[0].length - 1 && map[nodo.value.y ][nodo.value.x + 1] != 'W') {
        if (map[nodo.value.y ][nodo.value.x + 2] != 'W' && map[nodo.value.y ][nodo.value.x + 1] == 'C') {
            //logica para modificar las posiciones de las cajas en la variable boxes
        }
        children.push({value: {x: nodo.value.x + 1,
                               y: nodo.value.y},
                        actions: nodo.actions + 'R',
                        level: nodo.level + 1
        });
    }
    // Down
    if (nodo.value.y < map.length - 1 && map[nodo.value.y + 1][nodo.value.x] != 'W') {
        if (map[nodo.value.y + 2][nodo.value.x] != 'W' && map[nodo.value.y + 1][nodo.value.x] == 'C') {
            //logica para modificar las posiciones de las cajas en la variable boxes
        }
        children.push({value: {x: nodo.value.x,
                               y: nodo.value.y + 1},
                        actions: nodo.actions + 'D',
                        level: nodo.level + 1
        });
    }

    return children;
}



let constantes = {map, solution, start, actions, costs, boxes}
let root = {value: constantes.start, actions: '', level: 0};

//let children = getChildren(root, constantes);

/* console.log(children)

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

console.log(isSolution({'boxes':[{
    'x': 1,
    'y': 3
},
{
    'x': 3,
    'y': 1
}]}, {'solution':[{
    'x': 1,
    'y': 3
},
{
    'x': 3,
    'y': 1
}]}) == true) //prueba de isSolution

console.log(isSolution({'boxes':[{
    'x': 1,
    'y': 3
},
{
    'x': 3,
    'y': 1
}]}, {'solution':[{
    'x': 1,
    'y': 3
},
{
    'x': 3,
    'y': 2
}]}) == false)*/


let problem = {constantes, isSolution, getChildren}

//let solution = bfs(problem);

//console.log(solution); // "RUUUUU"


function read(){
    file = fs.readFileSync('/home/juancamilo/Cursos/2021-1/IA/Informed-Search/sokoban/levels/level1.txt', 'utf-8')
    line = file.split('\n')
    //Las lineas cuyo tamaño es 3 corresponden a la posición del muñeco, y las posiciones de la caja respectivamente
    /// las otras son el mapa
    posiciones = []
    mapita = []
    sols = []
    bx = []

    for (let i = 0; i < line.length; i++) {
        if(line[i].length == 3){
            posiciones.push({
                'x': line[i][0],
                'y': line[i][2]
            })
        }else {
            mapita.push(line[i].split(''))
        }
    }

    //como el objetivo es poner las cajas en las 'X', guardemos las posiciones las 'X' en solutions
    for(let i = 0; i < mapita.length; i++) {
        for (let j = 0; j < mapita.length; j++) {
            if (mapita[i][j] == 'X') {
                sols.push({
                    'x': j,
                    'y': i
                })
            }
        }
    }


    start = posiciones[0]
    mapita[posiciones[1].x][posiciones[1].y] = 'C'
    bx.push({
        'x': posiciones[1].x,
        'y': posiciones[1].y
    })
    mapita[posiciones[2].x][posiciones[2].y] = 'C' //ponemos en el mapa una C de Caja
    bx.push({
        'x': posiciones[2].x,
        'y': posiciones[2].y
    })
    boxes = bx
    solution = sols;
    map = mapita;
}

read()
