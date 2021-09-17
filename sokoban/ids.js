

function addToQueue(queue, nodes) {
    queue.unshift(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift();
}

function generateKey(nodo) {
    let mapaL = nodo.map.length;
    let key = 0
    let x = nodo.value.x;
    let y = nodo.value.y;
    let boxes = nodo.boxes;
    key = (x + 1) + (y * mapaL) //casillaPosición-(x1,y1)-(x2,y2)
    for (let i = 0; i < boxes.length; i++) {
        key += '-(' + boxes[i].x + ',' + boxes[i].y + ')';
    }

    return key
}

function avoidCycles(nodo, hashtable) {
    let key = generateKey(nodo)
    if (hashtable.includes(key)) {
        return true
    } else {
        hashtable.push(key);
        return false
    }
}



function ids(problem) {
    let nodoRaiz = {
        value: problem.constantes.start,
        actions: '',
        level: 0,
        boxes: problem.constantes.boxes,
        map: problem.constantes.map
    };
    let limit = 0;
    let found = true;


    while (found) {
        let hashtable = [];
        let cola = [];
        cola = [nodoRaiz];
        while (cola.length != 0) {
            let nodoExpandido = removeFromQueue(cola);
            if (avoidCycles(nodoExpandido, hashtable) || nodoExpandido.level > 64) {
                continue;
            } else if (problem.isSolution(nodoExpandido, problem.constantes)) {
                found = false;
                return 'Es meta el nodo ' + nodoExpandido.actions + ' nivel ' + nodoExpandido.level;
            } else if (nodoExpandido.level < limit) {
                addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
            }

        }
        limit++;
    }
    return 'no se encontró solución'

}

module.exports = ids;