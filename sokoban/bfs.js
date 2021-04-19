var hashtable = [];
let nodosExpandidos = [];

function addToQueue(queue, nodes) {
    queue.push(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift();
}

function generateKey(nodo, mapa) {
    let mapaL = nodo.map.length;
    let key = 0
    let x = nodo.value.x;
    let y = nodo.value.y;
    let boxes = nodo.boxes;
    key = (x + 1) + (y * mapaL) //casillaPosición-(x1,y1)-(x2,y2) 2 + 1*6
    for (let i = 0; i < boxes.length; i++) {
        key += '-('+boxes[i].x+','+boxes[i].y+')';
    }

    return key
}

function avoidCycles(nodo, mapa) {
    let key = generateKey(nodo, mapa)
    let index = hashtable.indexOf(key);
    if (index == -1) {
        hashtable.push(key);
        return true
    }
    return false
}



function bfs(problem) {
    let nodoRaiz = {
        value: problem.constantes.start,
        actions: '',
        level: 0,
        boxes: problem.constantes.boxes,
        map: problem.constantes.map
    };

    let cola = [];
    cola = [nodoRaiz];
    while (cola.length != 0) { //(cola[0].level < 4){//(cola[0].actions.length < 60) {//
        let nodoExpandido = removeFromQueue(cola);

        if (problem.isSolution(nodoExpandido, problem.constantes)) {
            //console.log(nodoExpandido.actions)
            return 'Es meta el nodo ' + nodoExpandido.actions + ' nivel ' + nodoExpandido.level;
        } else if (!avoidCycles(nodoExpandido, nodosExpandidos)) {
            continue;
        } else {
            addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
        }
    }
    return 'no se encontró solución'
}

module.exports = bfs;