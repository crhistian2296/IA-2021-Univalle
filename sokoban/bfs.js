function addToQueue(queue, nodes) {
    queue.push(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift();
}

function bfs(problem) {
    let nodoRaiz = {
        value: '',
        actions: '',
        level: 0
    };

    let cola = [];
    cola = [nodoRaiz];
    while (cola.length != 0) {
        //console.log(cola);
        if (cola.length == 0) {
            return 'Error';
        }
        //console.log(cola);
        let nodoExpandido = removeFromQueue(cola);
        if (problem.isSolution(nodoExpandido, problem.constantes)) {
            console.log(nodoExpandido.actions)
            return 'Es meta el nodo '+nodoExpandido.actions+' nivel '+nodoExpandido.level;
        } else {
            addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
        }
    }

}

module.exports = bfs;