let map = nodo.map;
    let children = [];
    let boxes = nodo.boxes;
    // Up
    if (nodo.value.y >= 1 && map[nodo.value.y - 1][nodo.value.x] != 'W') {
        //if (map[nodo.value.y - 2][nodo.value.x] != 'W' && map[nodo.value.y - 2][nodo.value.x] != 'C' && map[nodo.value.y - 1][nodo.value.x] == 'C') {
        if (map[nodo.value.y - 1][nodo.value.x] == 'C' && (map[nodo.value.y - 2][nodo.value.x] == '0' || map[nodo.value.y - 2][nodo.value.x] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            let y = nodo.value.y - 1;
            let x = nodo.value.x;
            let box = boxes.slice();
            let m = map.slice();
            let posboxold = {};
            let posboxnew = {};


            for (let i = 0; i < box.length; i++) {
                if (box[i].y == y && box[i].x == x) {
                    posboxold = { x: box[i].x, y: box[i].y }
                    posboxnew = { x: box[i].x, y: box[i].y - 1 }
                    box[i].y--;
                    //let aux = m[posboxnew.y][posboxnew.x];
                    m[posboxnew.y][posboxnew.x] = 'C';
                    m[posboxold.y][posboxold.x] = '0';
                }
            }




            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y - 1
                },
                actions: nodo.actions + 'U',
                level: nodo.level + 1,
                boxes: box,
                map: m
            });
        } else if (map[nodo.value.y - 1][nodo.value.x] == '0' || map[nodo.value.y - 1][nodo.value.x] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y - 1
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
    if (nodo.value.y < map.length - 1 && map[nodo.value.y + 1][nodo.value.x] != 'W') {
        if (map[nodo.value.y + 1][nodo.value.x] == 'C' && (map[nodo.value.y + 2][nodo.value.x] == '0' || map[nodo.value.y + 2][nodo.value.x] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            let y = nodo.value.y + 1; //posicion de la caja 
            let x = nodo.value.x;
            let box = boxes.slice();
            let m = map.slice();
            let posboxold = {};
            let posboxnew = {};


            for (let i = 0; i < box.length; i++) {
                if (box[i].y == y && box[i].x == x) {
                    posboxold = { x: box[i].x, y: box[i].y }
                    posboxnew = { x: box[i].x, y: box[i].y + 1 }
                    box[i].y=box[i].y+1;
                    //let aux = m[posboxnew.y][posboxnew.x];
                    m[posboxnew.y][posboxnew.x] = 'C';
                    m[posboxold.y][posboxold.x] = '0';
                }
            }


            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y + 1
                },
                actions: nodo.actions + 'D',
                level: nodo.level + 1,
                boxes: box,
                map: m
            });
        } else if (map[nodo.value.y + 1][nodo.value.x] == '0' || map[nodo.value.y + 1][nodo.value.x] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x,
                    y: nodo.value.y + 1
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
    if (nodo.value.x >= 1 && map[nodo.value.y][nodo.value.x - 1] != 'W') {
        if (map[nodo.value.y][nodo.value.x - 1] == 'C' &&  (map[nodo.value.y][nodo.value.x - 2] == '0' || map[nodo.value.y][nodo.value.x - 2] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            let y = nodo.value.y;
            let x = nodo.value.x - 1;
            let box = boxes.slice();
            let m = map.slice();
            let posboxold = {};
            let posboxnew = {};


            for (let i = 0; i < box.length; i++) {
                if (box[i].y == y && box[i].x == x) {
                    posboxold = { x: box[i].x, y: box[i].y }
                    posboxnew = { x: box[i].x - 1, y: box[i].y }
                    box[i].x--;
                    //let aux = m[posboxnew.x][posboxnew.y];
                    m[posboxnew.y][posboxnew.x] = 'C';
                    m[posboxold.y][posboxold.x] = '0';
                }
            }



            children.push({
                value: {
                    x: nodo.value.x - 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'L',
                level: nodo.level + 1,
                boxes: box,
                map: m
            });
        } else if (map[nodo.value.y][nodo.value.x - 1] == '0' || map[nodo.value.y][nodo.value.x - 1] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x - 1,
                    y: nodo.value.y
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
    if (nodo.value.x < map[0].length - 1 && map[nodo.value.y][nodo.value.x + 1] != 'W') {
        if (map[nodo.value.y][nodo.value.x + 1] == 'C' && (map[nodo.value.y][nodo.value.x + 2] == '0' || map[nodo.value.y][nodo.value.x + 2] == 'X')) {
            //logica para modificar las posiciones de las cajas en la variable boxes
            let y = nodo.value.y;
            console.log('y',y);
            let x = nodo.value.x + 1;
            console.log('x',x);
            let box = boxes.slice();
            let m = map.slice();
            let posboxold = {};
            let posboxnew = {};

            for (let i = 0; i < box.length; i++) {
                if (box[i].y == y && box[i].x == x) {
                    posboxold = { x: box[i].x, y: box[i].y }
                    posboxnew = { x: box[i].x + 1, y: box[i].y }
                    box[i].x++;
                    console.log('AUX',posboxnew);
                    console.log('goal', constantes.solution);
                    //let aux = m[posboxnew.y][posboxnew.x];
                    m[posboxnew.y][posboxnew.x] = 'C';
                    m[posboxold.y][posboxold.x] = '0';
                }
            }



            children.push({
                value: {
                    x: nodo.value.x + 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'R',
                level: nodo.level + 1,
                boxes: box
            });
        } else if (map[nodo.value.y][nodo.value.x + 1] == '0' || map[nodo.value.y][nodo.value.x + 1] == 'X') {
            children.push({
                value: {
                    x: nodo.value.x + 1,
                    y: nodo.value.y
                },
                actions: nodo.actions + 'R',
                level: nodo.level + 1,
                boxes: boxes,
                map: map
            });
        }

    }


    return children;