const bfs = require("./bfs");
const dfs = require("./dfs");
const fs = require('fs');
const path = require('path');

var map = []

var start = {
    x: 0,
    y: 2
};
var solution = []; //{ x: 3, y: 1 }
var boxes = [] //Guarda las posiciones iniciales de las cajas
const actions = ['U', 'D', 'L', 'R'];
const costs = [1, 1, 1, 1];

//let nodo = {value: {x: 2, y: 6}, actions: 'RU', level: 2};

function isSolution(nodo, constantes) {
    var solution = constantes.solution;
    var boxes = nodo.boxes;
    let contador = 0; //si es solucion, al final debe ser igual al tamaño de boxes
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            if (boxes[i].x == solution[j].x && boxes[i].y == solution[j].y) {
                contador++;
            }
        }
    }

    if (contador == boxes.length)
        return true;
    return false;
}

function getChildren(nodo, constantes) {
    let map = nodo.map;
    let children = [];
    let boxes = nodo.boxes;
    // Up
    if (nodo.value.x >= 1 && map[nodo.value.x - 1][nodo.value.y] != 'W') {
        if (map[nodo.value.x - 1][nodo.value.y] == 'C' && (map[nodo.value.x - 2][nodo.value.y] == '0' || map[nodo.value.x - 2][nodo.value.y] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            let m1 = JSON.parse(JSON.stringify(map));
            let box1 = JSON.parse(JSON.stringify(boxes));

            for (let i = 0; i < box1.length; i++) {
                if (box1[i].y == nodo.value.y && box1[i].x == nodo.value.x - 1) {
                    box1[i].x--;
                    //let aux = m[posboxnew.y][posboxnew.x];
                    m1[nodo.value.x - 2][nodo.value.y] = 'C';
                    m1[nodo.value.x - 1][nodo.value.y] = '0';
                    break;
                }
            }


            children.push({
                value: {
                    x: nodo.value.x - 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'U',
                level: nodo.level + 1,
                boxes: box1,
                map: m1
            });
        } else if (map[nodo.value.x - 1][nodo.value.y] == '0' || map[nodo.value.x - 1][nodo.value.y] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x - 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'U',
                level: nodo.level + 1,
                boxes: boxes,
                map: map
            });
        }
        //console.log(boxes);
    }

    // Down
    if (nodo.value.x < map.length - 1 && map[nodo.value.x + 1][nodo.value.y] != 'W') {
        if (map[nodo.value.x + 1][nodo.value.y] == 'C' && (map[nodo.value.x + 2][nodo.value.y] == '0' || map[nodo.value.x + 2][nodo.value.y] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            
            let m2 = JSON.parse(JSON.stringify(map));
            let box2 = JSON.parse(JSON.stringify(boxes));


            for (let i = 0; i < box2.length; i++) {
                if (box2[i].y == nodo.value.y && box2[i].x == nodo.value.x + 1) {
                    box2[i].x++;
                    //let aux = m[posboxnew.y][posboxnew.x];
                    m2[nodo.value.x + 2][nodo.value.y] = 'C';
                    m2[nodo.value.x + 1][nodo.value.y] = '0';
                    break;
                }
            }

            children.push({
                value: {
                    x: nodo.value.x + 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'D',
                level: nodo.level + 1,
                boxes: box2,
                map: m2
            });
        } else if (map[nodo.value.x + 1][nodo.value.y] == '0' || map[nodo.value.x + 1][nodo.value.y] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x + 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'D',
                level: nodo.level + 1,
                boxes: boxes,
                map: map
            });
        }
        //console.log(boxes);
    }


    // Left
    if (nodo.value.y >= 1 && map[nodo.value.x][nodo.value.y - 1] != 'W') {

        if (map[nodo.value.x][nodo.value.y - 1] == 'C' && (map[nodo.value.x][nodo.value.y - 2] == '0' || map[nodo.value.x][nodo.value.y - 2] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            
            let m3 = JSON.parse(JSON.stringify(map));
            let box3 = JSON.parse(JSON.stringify(boxes));

            for (let i = 0; i < box3.length; i++) {
                if (box3[i].y == nodo.value.y - 1 && box3[i].x == nodo.value.x) {

                    box3[i].y--;
                    //let aux = m[posboxnew.x][posboxnew.y];
                    m3[nodo.value.x][nodo.value.y - 2] = 'C';
                    m3[nodo.value.x][nodo.value.y - 1] = '0';
                    break;
                }
            }

            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y - 1
                },
                actions: nodo.actions + 'L',
                level: nodo.level + 1,
                boxes: box3,
                map: m3
            });
        } else if (map[nodo.value.x][nodo.value.y - 1] == '0' || map[nodo.value.x][nodo.value.y - 1] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y - 1
                },
                actions: nodo.actions + 'L',
                level: nodo.level + 1,
                boxes: boxes,
                map: map
            });
        }
        //console.log(boxes);
    }

    // Right
    if (nodo.value.y < map[0].length - 1 && map[nodo.value.x][nodo.value.y + 1] != 'W') {
        if (map[nodo.value.x][nodo.value.y + 1] == 'C' && (map[nodo.value.x][nodo.value.y + 2] == '0' || map[nodo.value.x][nodo.value.y + 2] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
        
            let m4 = JSON.parse(JSON.stringify(map));
            let box4 = JSON.parse(JSON.stringify(boxes));

            for (let i = 0; i < box4.length; i++) {
                if (box4[i].y == nodo.value.y + 1 && box4[i].x == nodo.value.x) {
                    box4[i].y++;
                    //let aux = m[posboxnew.y][posboxnew.x];
                    m4[nodo.value.x][nodo.value.y + 2] = 'C';
                    m4[nodo.value.x] [nodo.value.y + 1]= '0';
                    break;
                }
            }


            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y + 1
                },
                actions: nodo.actions + 'R',
                level: nodo.level + 1,
                boxes: box4,
                map: m4
            });
        } else if (map[nodo.value.x][nodo.value.y + 1] == '0' || map[nodo.value.x][nodo.value.y + 1] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y + 1
                },
                actions: nodo.actions + 'R',
                level: nodo.level + 1,
                boxes: boxes,
                map: map
            });
        }

    }
    return children;
}




//let root = { value: constantes.start, actions: '', level: 0 };

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




//console.log(solution); // "RUUUUU"


function read() {
    file = fs.readFileSync('/home/juancamilo/Cursos/2021-1/IA/IA-2021-Univalle/sokoban/levels/nivel3.txt', 'utf-8')
    line = file.split('\n')
    //Las lineas cuyo tamaño es 3 corresponden a la posición del muñeco, y las posiciones de la caja respectivamente
    /// las otras son el mapa
    posiciones = []
    mapita = []
    sols = []
    bx = []

    for (let i = 0; i < line.length; i++) {
        if (line[i].length == 3) {
            posiciones.push({
                'x': parseInt(line[i][0]),
                'y': parseInt(line[i][2])
            })
        } else {
            mapita.push(line[i].split(''))
        }
    }

    //como el objetivo es poner las cajas en las 'X', guardemos las posiciones las 'X' en solutions
    for (let i = 0; i < mapita.length; i++) {
        for (let j = 0; j < mapita.length; j++) {
            if (mapita[i][j] == 'X') {
                sols.push({
                    'x': i,
                    'y': j
                })
            }
        }
    }

    start = posiciones[0]
    //generalizamos para n cajas
    for (let i = 1; i < posiciones.length; i++) {
        mapita[posiciones[i].x][posiciones[i].y] = 'C'
        bx.push({
            'x': parseInt(posiciones[i].x),
            'y': parseInt(posiciones[i].y)
        })
    }
    
    //mapita[posiciones[0].x][posiciones[0].y] = 'J' //prueba ubicacion inicial del agente
    /* mapita[posiciones[1].x][posiciones[1].y] = 'C'
    bx.push({
        'x': parseInt(posiciones[1].x),
        'y': parseInt(posiciones[1].y)
    })
    mapita[posiciones[2].x][posiciones[2].y] = 'C' //ponemos en el mapa una C de Caja
    bx.push({
        'x': parseInt(posiciones[2].x),
        'y': parseInt(posiciones[2].y)
    }) */
    boxes = bx
    solution = sols;
    map = mapita;
}

read()
//console.log(map);
let constantes = {
    map,
    solution,
    start,
    actions,
    costs,
    boxes
}

let problem = {
    constantes,
    isSolution,
    getChildren
}

let solutionProblem = dfs(problem);
console.log(solutionProblem);

/* console.log(getChildren({
    value: { x: 1, y: 2 },
    actions: '',
    boxes: [{ x: 2, y: 2 }, { x: 2, y: 3 }],
    level: 0,
    map: map
}, { 'map': map }));  */

/*  mm = getChildren({
    value: { x: 1, y: 1 },
    actions: '',
    boxes: [{ x: 2, y: 2 }, { x: 2, y: 3 }],
    level: 1,
    map: map
}, { 'map': map })



console.log(mm[1]); */
/* console.log(solution);

console.log(boxes); */
//console.log(map);