function addToQueue(queue, nodes) {
    queue.push(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift();
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
    while (cola[0].level < 4){//(cola.length != 0) { //
        //console.log(cola);
        let nodoExpandido = removeFromQueue(cola);
        console.log(nodoExpandido);
        /* console.log(nodoExpandido.actions);
        console.log(nodoExpandido.value);
        console.log(nodoExpandido.boxes);
        console.log(nodoExpandido.map);
        console.log(nodoExpandido.map[nodoExpandido.value.x][nodoExpandido.value.y]);
        console.log('------');  */
        
        if (problem.isSolution(nodoExpandido, problem.constantes)) {
            console.log(nodoExpandido.actions)
            return 'Es meta el nodo ' + nodoExpandido.actions + ' nivel ' + nodoExpandido.level;
        } else {
            addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
        }
    }

}

module.exports = bfs;