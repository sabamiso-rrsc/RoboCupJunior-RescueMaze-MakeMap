//座標は[x,y]っぽい
const white_tile = 0
const black_tile = 1
const blue_tile = 2
const red_tile = 3
const silver_tile = 4
const start_tile = 9
const up_stair = 5
const left_stair = 6
const down_stair = 7
const right_stair = 8
const tile_list = [white_tile,up_stair,left_stair,down_stair,right_stair,black_tile,blue_tile, red_tile, silver_tile, start_tile]       //white black blue
const stair_IMG = new Image()
stair_IMG.src = "right_stair.png"
const silver_tile_IMG = new Image()
silver_tile_IMG.src = "silver_tile.png"

const maze_space_size = 100
const wall_thickness = 16
const onespx = maze_space_size-wall_thickness           //one space size
const wallcolor = '#808000'
const no_wall_color = '#f0f0f0'
const white_tile_color = '#ffffff'
const black_tile_color = '#000000'
const blue_tile_color = '#0000ff'
const red_tile_color = '#ff0000'
const start_tile_color = '#aaffaa'
const start_size = 16

let maze_y = parseInt(document.getElementById("maze_y").value)
let maze_x = parseInt(document.getElementById("maze_x").value)
let maze_z = parseInt(document.getElementById("maze_z").value)
let maze_wall_data = [...Array(maze_z)].map(() => 
    [...Array(maze_x * 2 + 1)].map(() => 
        [...Array(maze_y * 2 + 1)].map(() => 0)
    )
);
let start_pos = [0,0,0]

upDateMazeSize()
drawMaze()


function upDateMazeSize(){
    bmy = maze_y
    bmx = maze_x
    bmz = maze_z
    maze_y = parseInt(document.getElementById("maze_y").value)
    maze_x = parseInt(document.getElementById("maze_x").value)
    maze_z = parseInt(document.getElementById("maze_z").value)
    //console.log(maze_wall_data)
    maze_wall_data = [...Array(maze_z)].map((_, z) => 
        [...Array(maze_x * 2 + 1)].map((_, x) => 
            [...Array(maze_y * 2 + 1)].map((_, y) => 
                ((z < bmz) && (x < bmx * 2 + 1) && (y < bmy * 2 + 1)) ? maze_wall_data[z][x][y] : 0
            )
        )
    );
    //console.log(maze_y,maze_x)
    //console.log(maze_wall_data)
}

function drawMaze(){
    canvas = document.getElementById("maze_canvas")
    canv = canvas.getContext('2d')
    canvas.height = (maze_y * onespx + wall_thickness + onespx) * maze_z
    canvas.width = maze_x * onespx + wall_thickness
    one_floor_height = maze_y * onespx + wall_thickness + onespx
    angle = 0
    for(let z=0; z<maze_z; z++){
        canv.fillStyle = wallcolor      //壁書くよ
        for(let x=0; (x*2+1)<maze_x*2+1;x+=1){            //横向きの壁 
            for(let y=0; (y*2)<maze_y*2+1; y+=1){
                if (maze_wall_data[z][x*2+1][y*2]==0)canv.fillStyle = no_wall_color
                else canv.fillStyle = wallcolor
                canv.fillRect(x*onespx+wall_thickness, y*onespx + z*one_floor_height, maze_space_size-wall_thickness*2, wall_thickness)
            }
        }
        for(let x=0; (x*2)<=maze_x*2+1;x+=1){            //縦向きの壁 
            for(let y=0; (y*2+1)<maze_y*2+1; y+=1){
                if (maze_wall_data[z][x*2][y*2+1]==0)canv.fillStyle = no_wall_color
                else canv.fillStyle = wallcolor
                canv.fillRect(x*onespx, y*onespx+wall_thickness + z*one_floor_height, wall_thickness, maze_space_size-wall_thickness*2)
            }
        }
        
        for(let x=0; (x*2+1)<maze_x*2+1;x+=1){            //色タイル
            for(let y=0; (y*2+1)<maze_y*2+1; y+=1){
                console.log(maze_wall_data[z][x*2+1][y*2+1])
                if (maze_wall_data[z][x*2+1][y*2+1]==white_tile)canv.fillStyle = white_tile_color
                else if (maze_wall_data[z][x*2+1][y*2+1]==black_tile)canv.fillStyle = black_tile_color
                else if (maze_wall_data[z][x*2+1][y*2+1]==blue_tile)canv.fillStyle = blue_tile_color
                else if (maze_wall_data[z][x*2+1][y*2+1]==red_tile)canv.fillStyle = red_tile_color
                else canv.fillStyle = white_tile_color
                canv.fillRect(x*onespx+wall_thickness, y*onespx+wall_thickness + z*one_floor_height, maze_space_size-wall_thickness*2, maze_space_size-wall_thickness*2)
                if(maze_wall_data[z][x*2+1][y*2+1]<=right_stair && maze_wall_data[z][x*2+1][y*2+1]>=up_stair){
                    if(maze_wall_data[z][x*2+1][y*2+1]==up_stair)angle=270
                    else if(maze_wall_data[z][x*2+1][y*2+1]==left_stair)angle=180
                    else if(maze_wall_data[z][x*2+1][y*2+1]==down_stair)angle=90
                    else if(maze_wall_data[z][x*2+1][y*2+1]==right_stair)angle=0
                    angle = angle*Math.PI/180
                    canv.save();
                    canv.translate(x*onespx+wall_thickness+(onespx-wall_thickness)/2, y*onespx+wall_thickness + z*one_floor_height+(onespx-wall_thickness)/2);
                    canv.rotate(angle);
                    canv.drawImage(stair_IMG, -(stair_IMG.width/2), -(stair_IMG.height/2));
                    canv.restore();
                }else if(maze_wall_data[z][x*2+1][y*2+1] == silver_tile){
                    canv.save();
                    canv.translate(x*onespx+wall_thickness+(onespx-wall_thickness)/2, y*onespx+wall_thickness + z*one_floor_height+(onespx-wall_thickness)/2);
                    canv.drawImage(silver_tile_IMG, -(stair_IMG.width/2), -(stair_IMG.height/2));
                    canv.restore();
                }
            }
        }
    }
    
    canv.fillStyle = start_tile_color
    console.log(start_pos)
    canv.arc(start_pos[1]*onespx+wall_thickness+start_size, start_pos[2]*onespx+wall_thickness+start_size + start_pos[0]*one_floor_height, 8, 0, Math.PI*2,false)
    canv.fill()
    //canv.fillRect(start_pos[0]*onespx+wall_thickness+start_size, start_pos[1]*onespx+wall_thickness+start_size, start_size, start_size)
    //console.log("drawMaze called")
}

function judgeTouchWhereAndUpdateMap(x,y){              //maze配列の更新
    one_floor_height = maze_y * onespx + wall_thickness + onespx
    bsz = Math.floor(y/one_floor_height)
    bsx = Math.floor(x/onespx)
    sx = x%onespx
    bsy = Math.floor((y%one_floor_height)/onespx)
    sy = (y%one_floor_height)%onespx
    if(y%one_floor_height >= maze_y * onespx + wall_thickness){
        console.log("下の隙間");
    }else if (sx>wall_thickness && sy<=wall_thickness){               //横壁
        maze_wall_data[bsz][bsx*2+1][bsy*2] += 1
        maze_wall_data[bsz][bsx*2+1][bsy*2] %= 2
    }else if (sx<=wall_thickness && sy>wall_thickness){         //縦壁
        maze_wall_data[bsz][bsx*2][bsy*2+1] += 1
        maze_wall_data[bsz][bsx*2][bsy*2+1] %= 2
    }else if(sx>wall_thickness && sy>wall_thickness){           //タイル
        let tile_color_elm = document.getElementsByName("tile")
        let elm_len = tile_color_elm.length
        let result = -1
        let result_color = 0
        for(let i=0;i<elm_len;i++){
            if(tile_color_elm[i].checked){
                result = i
                result_color = tile_color_elm[i].value
            }
        }
        console.log(result + "tile")
        if (result!=9){
            console.log(result);
            maze_wall_data[bsz][bsx*2+1][bsy*2+1] = tile_list[result]
            console.log(bsz,bsx*2+1,bsy*2+1)
        }else{
            start_pos = [bsz,bsx,bsy]
            console.log(start_pos)
        }
    }else{
        console.log("何も押されなかった")
    }
}

function save(){
    save_str = ""
    
    save_str += maze_z + " " + maze_y + " " + maze_x + "\n"
    save_str += start_pos[0] + " " + start_pos[2] + " " + start_pos[1] + "\n"
    for(let z=0; z<maze_z; z+=1){
        for(let y=0; y<maze_wall_data[0][0].length; y+=1){
            for(let x=0; x<maze_wall_data[0].length; x+=1){
                save_str+=maze_wall_data[z][x][y]
            }
            save_str+="\n"
        }
        save_str+="\n"
    }
    
    blob_data = new Blob([save_str], {type:"text/txt"})
    document.getElementById("save_btn").href = window.URL.createObjectURL(blob_data)
    console.log(save_str)
}

function load(file_elm) {
    const file_data = file_elm.files;
    if (!file_data || file_data.length === 0) {
        alert("ファイルが選択されていません");
        return;
    }
    const file = file_data[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            const lines = text.trim().split('\n');
            const [z, y, x] = lines[0].split(' ').map(Number);
            if (
                isNaN(z) || isNaN(y) || isNaN(x) ||
                z <= 0 || y <= 0 || x <= 0
            ) throw new Error("サイズ情報が不正です");

            maze_z = z;
            maze_y = y;
            maze_x = x;
            document.getElementById("maze_z").value = z;
            document.getElementById("maze_y").value = y;
            document.getElementById("maze_x").value = x;

            // ここで配列を確保
            maze_wall_data = [...Array(z)].map(() =>
                [...Array(x * 2 + 1)].map(() =>
                    Array(y * 2 + 1).fill(0)
                )
            );

            let idx = 1;
            for (let zi = 0; zi < z; zi++) {
                for (let yi = 0; yi < y * 2 + 1; yi++) {
                    if (idx >= lines.length) throw new Error("データが不足しています(y)");
                    const row = lines[idx++].split('').map(Number);
                    if (row.length !== x * 2 + 1) throw new Error("行の長さが不正です(x)");
                    for (let xi = 0; xi < x * 2 + 1; xi++) {
                        maze_wall_data[zi][xi][yi] = row[xi];
                    }
                }
                idx++; // 空行をスキップ
            }
            drawMaze();
            alert("マップを読み込みました");
        } catch (err) {
            alert("ファイル形式が不正です: " + err.message);
        }
    };
    reader.readAsText(file);
}

//スピンボタン押された時の処理
const input_nodelist = document.querySelectorAll('.number-input')        //number-inputクラスのやつを全部返す nodelistっていう型らしい
for(let i=0;i<input_nodelist.length;i++){
    let elm_node = input_nodelist.item(i)
    //console.log(elm_node)
    const $input = elm_node.querySelector('input')
    elm_node.querySelector('.spinner-down').onclick = ()=>{         //onclick要素を指定している
        $input.stepDown()
        
        upDateMazeSize()
        drawMaze()
    }
    elm_node.querySelector('.spinner-up').onclick = ()=>{
        $input.stepUp()
        
        upDateMazeSize()
        drawMaze()
    }
}

//canvasが押された時の処理を入れる
function canvas_onclick(){      //canvasが押された時の処理
    let clickX = event.pageX      //押された場所の座標取得（ページから見る）
    let clickY = event.pageY 
    let clientRect = this.getBoundingClientRect()      //おおよそ、今見ているところの座標を取得みたいな感じ。これにおいてはあんま意味ない
    let positionX = clientRect.left + window.pageXOffset ;     //キャンバスのページから見た座標を取得
    let positionY = clientRect.top + window.pageYOffset 
    let canx = clickX - positionX          //canvasからみた座標に変換
    let cany = clickY - positionY 
    //console.log("x="+canx +"\n"+ "y="+cany)
    
    judgeTouchWhereAndUpdateMap(canx,cany)
    drawMaze()
    
    
}
document.getElementById("maze_canvas").onclick = canvas_onclick