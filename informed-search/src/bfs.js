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
        level: 0
    };

    let cola = [];
    cola = [nodoRaiz];

    while (cola.length != 0) {
        if (cola.length == 0) {
            return 'Error';
        }
        let nodoExpandido = removeFromQueue(cola);

        if (problem.isSolution(nodoExpandido, problem.constantes)) {
            return `Es meta el nodo (${nodoExpandido.value.x},${nodoExpandido.value.y}) -> ${nodoExpandido.actions}`;
        } else {
            addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
        }
    }

}

module.exports = bfs;