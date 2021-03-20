    var simpleHashtable = require('simple-hashtable');
    var hashtable = new simpleHashtable();


    function addToQueue(queue, nodes) {
        queue.unshift(...nodes);
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

        if (!(hashtable.containsKey(key))) {
            hashtable.put(key, nodo.level)
            return true
        }
        return false
    }

    function dfs(problem) {
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
            } else if (!(avoidCycles(nodoExpandido, problem.constantes.map))) {
                continue;
            } else {
                addToQueue(cola, problem.getChildren(nodoExpandido, problem.constantes));
            }
            console.log(cola);
            console.log(hashtable.keys())
        }

    }
    module.exports = dfs;