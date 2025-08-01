# RoboCupJunior-RescueMaze-MakeMap

https://sabamiso-rrsc.github.io/RoboCupJunior-RescueMaze-MakeMap/draw_maze.html

RoboCupJunior Rescue Mazeカテゴリー用の迷路作成ツール  
A tool to make maps for RoboCupJunior Rescue Maze  
<img width="325" height="385" alt="image" src="https://github.com/user-attachments/assets/e3765b67-b9ef-4a15-a5c1-2c3cd559549f" />


## 概要 / Abstract
3次元マップに対応した迷路作成ツール  
A tool for making 3D map  
Fornax(X: https://x.com/Fornax_RRSC )はこのツールを用いて迷路探索アルゴリズムのテストを行っていました。  
Team Fornax(X: https://x.com/Fornax_RRSC ) would often test maze exploring algorithm with this tool.  

## 機能 / Functions
GUIによる迷路作成 / 
 Making map with GUI  
.txt形式で保存 /
 Save as .txt  
保存されたファイルの読み込み /
 Loading a saved file

## 使い方 / How to use

### 環境設定 / Preferences
download zipを押した後、「すべて展開」をする。そのあとフォルダの中から「draw_maze.html」 を開く。  
Click "download zip" and then "Extract all" Then open "draw_maze.html" from the folder.

### 迷路サイズの設定 / Configuration of maze sizes
それぞれの軸について、スピナーボタンもしくは手入力でサイズを設定できます。(サイズの反映はトグルボタン押下時のみ行われます)  
You can canfigurate each axis sizes with spinner button or manual input. (Updates are only reflected when spinner button is pushed)  

### 壁の作成 / making walls  
マップの灰色の部分(壁がない状態)を押すと壁が作成されます。もう一度押すと灰色に戻ります。  
clicking the gray are of the map (no_wall state) will get the state wall. clicking it again will return it to gray.  

### タイルの設定 / Configration of tiles
タイルには6つの状態があります。 / A tile has 6 states.  
<img width="856" height="100" alt="a" src="https://github.com/user-attachments/assets/f6f65ea4-887a-4927-88c3-d0234e269306" />

タイルがクリックされた時、画面上部のラジオボタンで選択されているタイルに上書きされます。  
When a tile is clicked, it will overwrite the tile selected using the radio button.

### 保存 / Save
「保存」ボタンを押すと、.txtファイルがダウンロードされます。  
Click the "保存"(save) button and a .txt file will be downloaded.

### 読み込み / Load  
「ファイルを読み込み」ボタンを押すと、ポップアップウィンドウが出現し、ファイルを選択すると、データが読み込まれます。  
When you press the "Load File" button, a pop-up window will appear and you can select a file to load the data.

## 迷路データの形式 / The format of map data
これは迷路データの一例です：  
This is an example of maps:  
<img width="352" height="704" alt="image" src="https://github.com/user-attachments/assets/3bf9d3fe-2ca7-47b5-b9c2-e020bd57b37c" />  
[maze.txt](https://github.com/user-attachments/files/21542380/maze.txt)  
1行目の「2 3 4」は迷路のサイズを表しています。高さ(z軸)方向に2, 縦(y軸)方向に3, 横(x軸)方向に4のサイズです。  
The first line "2 3 4" represents the size of the maze: 2 in the height (z-axis) direction, 3 in the length (y-axis) direction, and 4 in the width (x-axis) direction.  
2行目の「0 0 0」はスタートタイルの位置を表しています。z,y,xの順番です。  
The second line "0 0 0" represents the position of the starting tile, in the order z, y, x.  
それよりも下の行は壁およびタイルのデータです。  
The rows below that are wall and tile data.  
柱も位置合わせのために記録されています。  
The pillars are also recorded as 0 for alignment purposes.  
壁がある状態は1, ない状態は0として記録しています。  
The state where there is a wall is recorded as 1, and the state where there is no wall is recorded as 0.

### 色タイルと数字の対応テーブル / Color tile and number correspondence table
| 数字 | 色/役割 |
| ---- | ---- |
| 0 | white tile |
| 1 | black tile |
| 2 | blue tile |
| 3 | red tile |
| 4 | silver tile |
| 5 | up stair/slope |
| 6 | left stair/slope |
| 7 | down stair/slope |
| 8 | right stair/slope |
| 9 | start tile |
