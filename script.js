//elementos
var btIniciar;
var bola;
var cpu;
var jogador;
var painelTxtPontos;

//animação 
var game, frames;

//positions


//direcao teclado
var dirJy;

//Positions iniciais
const posJogIniY=180, posJogIniX=180, posBolaIniY=240, posBolaIniX=475;

//tamanhos
var campoX=0, campoY=0, compoW=960, campoH=500;
var barraW=20, barraH=140, bolaW=20, bolaH=20;

//Direcao, locomocao
var bolaX, bolaY;
var cpuY=0;

//velocidade
var velBola, velCpu, velJogador;

//controle
var pontos=0;
var tecla;
var jogo = false;
var posBolaX, posBolaY;
var posJogadorX, posJogadorY;
var posCpuX, posCpuY;

function controlaJog(){
    if(jogo){
        posJogadorY+=velJogador*dirJy;
        jogador.style.top=posJogadorY+"px";
    }
}

function teclaDw(){
    tecla=event.keyCode;
    if(tecla==38){//cima
        dirJy=-1;    
    }
    else if(tecla==40){//baixo
        dirJy=1;    
    }
}

function teclaUp(){
    tecla=event.keyCode;
    if(tecla==38){//cima
        dirJy=0;    
    }
    else if(tecla==40){//baixo
        dirJy=0;    
    }
}

function game(){
    if(jogo){
        controlaJog();
    }
    frames=requestAnimationFrame(game);
}

function iniciaJogo(){
    if(!jogo){
        cancelAnimationFrame(frames);
        jogo=true;
        dirJy=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY; 
        posJogadorY=0; 
        posCpuY=posCpuY;
        game();
    }
}

function inicializa(){
    velBola=velCpu=velJogador=8;
    btIniciar=document.getElementById("btIniciar");
    btIniciar.addEventListener("click", iniciaJogo);
    jogador=document.getElementById("dvJogador");
    cpu=document.getElementById("dvCpu");
    bola=document.getElementById("dvBola");
    painelTxtPontos=document.getElementById("txtPontos");
    document.addEventListener("keydown", teclaDw);
    document.addEventListener("keyup", teclaUp);
}

window.addEventListener("load",inicializa);