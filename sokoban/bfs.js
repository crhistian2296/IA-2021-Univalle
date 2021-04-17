var hashtable = []

function addToQueue(queue, nodes) {
    queue.push(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift();
}

function generateKey(nodo, mapa) {
    let mapaL = mapa.length;

    let x = nodo.value.x;
    let y = nodo.value.y;
    let key = (x + 1) + (y * mapaL)
    return key
}

function avoidCycles(nodo, mapa) {
    let key = generateKey(nodo, mapa)
    if (!(hashtable[key])) {
        //console.log(key, nodo.level);
        hashtable.push(key)
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

    //console.log(problem.constantes.boxes);
    let cola = [];
    cola = [nodoRaiz];
    while (cola.length != 0) { //(cola[0].level < 4){//(cola[0].actions.length < 60) {//
        //console.log(cola);
        let nodoExpandido = removeFromQueue(cola);
        console.log(nodoExpandido.actions);
        //console.log(nodoExpandido.map);
        //console.log(nodoExpandido);
         /* console.log(nodoExpandido.value);
        console.log(nodoExpandido.boxes);
        
        console.log(nodoExpandido.map[nodoExpandido.value.x][nodoExpandido.value.y]);
        console.log('------');  */

        if (problem.isSolution(nodoExpandido, problem.constantes)) {
            console.log(nodoExpandido.actions)
            return 'Es meta el nodo ' + nodoExpandido.actions + ' nivel ' + nodoExpandido.level;
        } else if (!(avoidCycles(nodoExpandido, problem.constantes.map))) {
            continue;
        } else {
            addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
        }
    }
    return 'no se encontró solución'
}

module.exports = bfs;