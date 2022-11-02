function getRandomColor() {
    return ('rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')');
}

class fld {
    snakes = [];
    randomColors = [];
    colors = ["white"];
    constructor(elem, size, score) {
        this.elem = elem;
        this.size = size;
        this.score = score;
    }

    addSnake(snake) {
        this.score.append(document.createElement('h1'));
        this.snakes.push(snake);
    }

    updateScore(id) {
        this.score.children[id].innerText = "Snake " + (id+1) + ": " + this.snakes[id].getSize();
    }
    
    build() {
        //array of arrays
        this.field = Array.apply(null, Array(size)).map(function (x, i) { return Array.apply(null, Array(size)).map( (x, i) => 0 ); });
        //for(let i = 0; i < size; i++) 
        //    console.log(field[i]);

        this.elem.style["grid-template-columns"] = "repeat("+ this.size + ", 50px)";
        for(var i = 0; i < size; i++)
            for(var j = 0; j < size; j++) {
                this.elem.append(document.createElement('div'));
                this.setCell(j, i, 0);
            }
        
        //for(var i = 0; i < 10; i++)
        //    this.randomColors.push('rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')');
        //console.log(this.randomColors);
    }
    
    getCell(x, y) {
        x = (((x|0) + this.size) % this.size);
        y = (((y|0) + this.size) % this.size);
        return this.field[y][x];
    }
    
    setCell(x, y, value, color = 0) {
        //console.log("SetCell: ", x, y, value);
        x = (((x|0) + this.size) % this.size);
        y = (((y|0) + this.size) % this.size);
        if(color == 0)
            color = this.colors[value];//this.randomColors[Math.floor(Math.random() * this.randomColors.length-1)];
        this.field[y][x] = value;
        this.elem.children[y*size + x].style["background-color"] = (value == 0) ? "blue" : color;
        this.elem.children[y*size + x].style["opacity"] = (value == 0) ? "0.1" : "1";
        
        //this.elem.children[y*size + x].style["background-color"] = (value == 0) ? "blue" : "lime";
    }

    tick() {
        this.snakes.forEach(snake => 
            snake.doMove()
        );
    }
    

}

class snake {
    orient = [1, 0];
    constructor(id, field, size, x, y) { //constructor([this.field, this.size, this.x, this.y]) {
        [this.id, this.field, this.x, this.y] = [id, field, x, y];
        this.setSize(size);
        for(var i = 1; i <= size; i++) {
            this.field.colors[i] = "orange";
            this.field.setCell(x - (i - 1), y, i);
        }
    }
    getSize() {
       return this.size;
    }

    setSize(size) {
        for(var i = this.field.colors.length; i <= size; i++) {
            this.field.colors.push(getRandomColor());
        }
        this.size = size;
        console.log(this.field.score.children);
        if(this.field.score.children.length >= this.id+1)
            this.field.updateScore(this.id);
    }
    
    getMove() {
        return this.orient;
    }

    setMove(xy) {
        this.orient = xy;
    }
    
    doMove() {
        if(this.orient[0] == 0 && this.orient[1] == 0)
            return;
        let nextpos = [this.x+this.orient[0], this.y+this.orient[1]];
        //console.log(nextpos);
        //console.log(nextpos[0]);
        if(this.field.getCell(nextpos[0], nextpos[1]) != 0) {
            alert("ban");
            this.orient = [0, 0];
            return;
        }
        this.updateCells(this.x, this.y);
        this.field.setCell(nextpos[0], nextpos[1], 1);
        [this.x, this.y] = nextpos;

        
    }
    updateCells(x, y) {
        let cur = this.field.getCell(x, y);
        this.field.setCell(x, y, cur+1); //this.field.colors[cur+1]
        for(var i = -1; i <= 1; i++) {
            for(var j = -1; j <= 1; j++) {
                if(i == 0 && j == 0)
                    continue;
                let gc = this.field.getCell(x+i, y+j);
                if(gc == cur+1) {
                    this.updateCells(x+i, y+j);
                    if(gc == this.size)
                        return this.field.setCell(x+i, y+j, 0);

                    return this.field.setCell(x+i, y+j, gc+1);
                }
            }
        }
    }
}





function inv(pair) {
    if(pair[0] == 0)
        return [pair[0], -pair[1]];
    if(pair[1] == 0)
        return [-pair[0], pair[1]];
    return [-pair[0], -pair[1]];
};

let size = 30;
let fil = new fld(document.getElementById("field"), size, document.getElementById("snakes"));
fil.build();
fil.addSnake(new snake(fil.snakes.length, fil, 5, 5, 1));



function equals(a1, a2) {
    return a1.length === a2.length && a1.every(function(v, i) { return v === a2[i]}); 
}


let interval = 200, cnt = 0;
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    let newMove = [0, -1];
    switch(event.key) {
        case "ArrowUp":
            /*console.log(inv([0, -1]));
            console.log(fil.snakes[0].getMove());
            console.log(fil.snakes[0].getMove() != inv([0, -1]));
            if(!equals(fil.snakes[0].getMove(), inv([0, -1]))) //WHY. TODO: 124 line WHY
                fil.snakes[0].setMove(0, -1);
            //Оказывается, в JS нет сравнения массивов по значению
            //fil.snakes[0].doMove();
            console.log("Up");*/
            break;
        case "ArrowDown":
            /*if(fil.snakes[0].getMove() != inv([0, 1]))
                fil.snakes[0].setMove(0, 1);
            //fil.snakes[0].doMove();
            console.log("Down");
            console.log(fil.snakes[0].field);*/
            newMove = [0, 1];
            break;
        case "ArrowLeft":
            /*if(fil.snakes[0].getMove() != inv([-1, 0]))
                fil.snakes[0].setMove(-1, 0);
            //fil.snakes[0].doMove();
            console.log("Left");*/
            newMove = [-1, 0];
            break;
        case "ArrowRight":
            /*if(fil.snakes[0].getMove() != inv([1, 0]))
            fil.snakes[0].setMove(1, 0);
            //fil.snakes[0].doMove();
            console.log("Right");*/
            newMove = [1, 0];
            break;
            
    }
    if(!equals(fil.snakes[0].getMove(), inv(newMove)))
        fil.snakes[0].setMove(newMove);
    cnt = interval;

}, false);

//let counterValue = 0;
//const counterValueElement = document.getElementById('counter-value');
let cnn = 0;
setInterval(function() {
    cnt+=10;
    if(cnt >= interval) {
        cnn++;
        cnt = 0;
        if(cnn % 3 == 0)
            fil.snakes[0].setSize(fil.snakes[0].getSize()+1);
        fil.tick();
    }
    //counterValue += 1;
    //counterValueElement.innerText = counterValue.toString();
  }, 10);

//fil.setCell(3, 3, 5);
//fil.setCell(1, 4, 5);

