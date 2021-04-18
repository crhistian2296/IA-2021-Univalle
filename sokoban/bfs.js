var hashtable = [];

function addToQueue(queue, nodes) {
    queue.push(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift();
}

function generateKey(nodo, mapa) {
    let mapaL = mapa.length;
    let key = 0
    let x = nodo.value.x;
    let y = nodo.value.y;
    let cajas = nodo.boxes;
    /* key = (x + 1) + (y * mapaL)
    for (let i = 0; i < cajas.length; i++) {
        key += ((cajas[i].x * 2 ** i) + (cajas[i].y * 2 ** (i + 3)));
    } */
    key += x + 10 * y;
    for (let i = 0; i < cajas.length; i++) {
        key +=
            100 ** (i + 1) * (cajas[i].x + 10 * cajas[i].y);
    }
    return key
}

function avoidCycles(nodo, mapa) {
    let key = generateKey(nodo, mapa)
    if ((hashtable.indexOf(key)) == -1) {
        hashtable.push(key);
        console.log(hashtable);
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
        let nodoExpandido = removeFromQueue(cola);
        console.log(nodoExpandido.actions);
        /*console.log(nodoExpandido.map);
        console.log(nodoExpandido.boxes); */

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