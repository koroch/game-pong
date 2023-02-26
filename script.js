//elementos
var btIniciar;
var bola;
var cpu;
var jogador;
var painelTxtPontos;

//animação 
var game, frames;

//direcao teclado
var dirJy;

//Positions iniciais
const posJogIniY=180, posJogIniX=10, posBolaIniY=240, posBolaIniX=475, posCpuIniY = 180, posCpuIniX=930;

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
var pontosCpu=0;
var tecla;
var jogo = false;
var posBolaX, posBolaY;
var posJogadorX, posJogadorY;
var posCpuX, posCpuY;

function controlaJog(){
    if(jogo){
        posJogadorY+=velJogador*dirJy;
        if(((posJogadorY+barraH)>=campoH) || (posJogadorY<=0)) {
            posJogadorY+=(velJogador*dirJy)*(-1);
        }
        jogador.style.top=posJogadorY+"px";
    }
}

function controlaCpu(){
    if(jogo){
        if((posBolaX > (compoW/2))&&(bolaX>0)){
            if(((posBolaY+(bolaH/2)) > ((posCpuY + (barraH/2)))+(velCpu*2))){
                //move para baixo
                if((posCpuY+barraH)<= (campoH-30)){
                    posCpuY+=velCpu;
                }
            }else if((posBolaY+(bolaH/2))<((posCpuY+(barraH/2))-(velCpu*2))){
                //move para cima
                if(posCpuY>30){
                    posCpuY-=velCpu;
                }
            } 
        }else{
            //posicionar cpu cenatro
            if((posCpuY+(barraH/2)) < (campoH/2)){
                posCpuY+=velCpu;
            }else if((posCpuY+(barraH/2)) > (campoH/2)){
                posCpuY-=velCpu;
            }
        }
        cpu.style.top = posCpuY+"px";
    }
}

function controlaBola(){
    posBolaX+=velBola*bolaX;
    posBolaY+=velBola*bolaY;
    
    //colisao com jogador
    if((posBolaX <= posJogadorX+barraW)&&((posBolaY+bolaH >= posJogadorY)&&(posBolaY<=posJogadorY+barraH))){
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/16);
        bolaX*=-1;
    }

    //colisao com cpu
    if((posBolaX >= posCpuX-barraW)&&((posBolaY+bolaH >= posCpuY)&&(posBolaY<=posCpuY+barraH))){
        bolaY=(((posBolaY+(bolaH/2))-(posCpuY+(barraH/2)))/16);
        bolaX*=-1;
    }

    //limites superior e inferior
    if((posBolaY >= 480)||(posBolaY<=0)){
        bolaY*=-1;
    }

    if(posBolaX >= (compoW-bolaH)){
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontos++;

        painelTxtPontos.value=pontos;
        jogo=false;
        jogador.style.top=posJogadorY+"px";
        cpu.style.top=posCpuY+"px";
    }else if(posBolaX<0){
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontosCpu++;
        painelTxtPontosCpu.value=pontosCpu;
        jogo=false;
        jogador.style.top=posJogadorY+"px";
        cpu.style.top=posCpuY+"px";
    }

    bola.style.top=posBolaY+"px";
    bola.style.left=posBolaX+"px";
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
        controlaBola();
        controlaCpu();
    }
    frames=requestAnimationFrame(game);
}

function iniciaJogo(){
    if(!jogo){
        velBola=velCpu=velJogador=8;
        cancelAnimationFrame(frames);
        jogo=true;
        dirJy=0;
        if((Math.random()*10<5)){
            bolaX=-1;
        }else{
            bolaX=1;
        }
        bolaY=0;
        posJogadorX = posJogIniX;
        posCpuX = posCpuIniX;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY; 
        posJogadorY=posJogIniY; 
        posCpuY=posCpuIniY;
        game();
    }
}

function inicializa(){
    velBola=velCpu=velJogador=8;
    btIniciar=document.getElementById("start-btn");
    btIniciar.addEventListener("click", iniciaJogo);
    const startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", () => {
    // Ação a ser executada ao clicar no botão de iniciar
    const explode = document.createElement("div");
    explode.classList.add("explode");
    startButton.appendChild(explode);
    setTimeout(() => {
        startButton.removeChild(explode);
        for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.animationDelay = Math.random() * 500 + "ms";
        const hue = Math.floor(Math.random() * 360);
        confetti.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        startButton.appendChild(confetti);
        }
        setTimeout(() => {
        const confettis = startButton.querySelectorAll(".confetti");
        confettis.forEach((confetti) => {
            startButton.removeChild(confetti);
        });
        }, 1000);
    }, 500);
    });
    jogador=document.getElementById("dvJogador");
    cpu=document.getElementById("dvCpu");
    bola=document.getElementById("dvBola");
    painelTxtPontos=document.getElementById("txtPontos");
    painelTxtPontosCpu=document.getElementById("txtPontosCpu");
    document.addEventListener("keydown", teclaDw);
    document.addEventListener("keyup", teclaUp);
}

window.addEventListener("load",inicializa);


document.querySelectorAll('.button').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');

