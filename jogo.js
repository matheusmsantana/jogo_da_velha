/*variavel GLOBAL para controlar a vez do jogador*/
var rodada = 1;
var matriz_jogo = Array(3);
/*Cada posição do meu array matriz_jogo esta recebendo um Array de  3 posições*/
matriz_jogo['a']= Array(3);
matriz_jogo['b']= Array(3);
matriz_jogo['c']= Array(3);
/*Atribuindo valores ao meu Array a*/
matriz_jogo['a'][1]= 0;
matriz_jogo['a'][2]= 0;
matriz_jogo['a'][2]= 0;
/*Atribuindo valores ao meu Array b*/
matriz_jogo['b'][1]= 0;
matriz_jogo['b'][2]= 0;
matriz_jogo['b'][2]= 0;
/*Atribuindo valores ao meu Array c*/
matriz_jogo['c'][1]= 0;
matriz_jogo['c'][2]= 0;
matriz_jogo['c'][2]= 0;

$(document).ready( function(){
    /*qnd img com ID btn_iniciar_jogo for clicado eu chamo outra função*/
    $('#btn_iniciar_jogo').click( function(){

        /*Validação para os inputs*/
        if($('#entrada_apelido_jogador_1').val() == ''){
            alert('apelido do jogador 1 invalido');
            return false;
        }

        if($('#entrada_apelido_jogador_2').val() == ''){
            alert('apelido do jogador 2 invalido');
            return false;
        }

        /*Inseriindo nome dos jogadores nos span's*/
        $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
        $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

        /*Exibindo DIV de JOGO*/
        $('#palco_jogo').show();
        /*Escondendo DIV de Opções Inicias de JOGO*/
        $('#pagina_inicial').hide();

    });

    $('.jogada').click( function(){
        var id_campo_clicado = this.id;

        $('#' + id_campo_clicado).off();
        
        jogada(id_campo_clicado);
    });

    /**/
    function jogada(id){
        var icone = '';
        var ponto = '0';

        /*Verificando a vez do jogador*/
        if((rodada % 2) == 1){
            //alert('é a vez do jogador 1');

            /*icone esta recebendo a imagem*/
            icone = 'url("imagens/marcacao_1.png")';

            /*atribuindo ponto*/
            ponto = -1;
        }else{
            //alert('é a vez do jogador 2');

            /*icone esta recebendo a imagem */
            icone = 'url("imagens/marcacao_2.png")';

            /*atribuindo ponto*/
            ponto = 1;
        }
        /*incrementando +1 a variavel apos for feita o click na classe jogada*/
        rodada++;

        /*Recuperado o ID da classe jogada que foi clicada*/
        $('#'+id).css('background-image', icone);
        
        /*separando linhas (a,b,c) de ecolunas (1,2,3), e atribundo ao meu array linha_coluna*/
        var linha_coluna = id.split('-');

        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        /*Ao final da jogado chamo a função que verifica q quantidade de pontos de cada jogador,,
        na horizontal, vertical e diagonal*/
        verifica_combinacao();
    }

    function verifica_combinacao(){

        /*verificando na horizontal(Linha a )*/
        var pontos = 0
        for(var i = 1;i<=3;i++){
            /*pontos recebe ele + o PONTO DO JOGADOR NAQUELA COLUNA DA LINHA*/
            pontos = pontos + matriz_jogo['a'][i];
        }
        ganhardor(pontos);         

        /*verificando na horizontal(Linha b )*/
        pontos = 0
        for(var i = 1;i<=3;i++){
       
            pontos = pontos + matriz_jogo['b'][i];
        }
        /*chamando a função que verifica ganhador do jogo*/
        ganhardor(pontos); 

        /*verificando na horizontal(Linha c )*/
        pontos = 0
        for(var i = 1;i<=3;i++){
           
            pontos = pontos + matriz_jogo['c'][i];
        }        
        /*chamando a função que verifica ganhador do jogo*/
        ganhardor(pontos);  
        
        /*verificando na vertical coluna nas linhas (a,b,c)*/
        for(l = 1;l<=3;l++){
            /*zerando quantidade de pontos, para cada soma das colunas quantidade de pontos e zerada*/
            pontos = 0;
            /*pontos recebe ele + pontos do jogador nas colunas das linhas(a, b, c)*/
            pontos += matriz_jogo['a'][l];
            pontos += matriz_jogo['b'][l];
            pontos += matriz_jogo['c'][l];
            ganhardor(pontos);
        }

        /*verificar na diagonal primeiro angulo*/
        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhardor(pontos);

        /*verificar na diagonal segundo angulo*/
        pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhardor(pontos);
    }    

        /*validando o ganhador do jogo*/
        function ganhardor(pontos){
            if(pontos == -3){
                var jogador_1 = $('#entrada_apelido_jogador_1').val();

                alert(jogador_1 +  ' É o vencedor');

                /*desabilitando função de click para que apos finalização do jogo nao possa mais haver click*/
                $('.jogada').off();
            }
            if(pontos == 3){
                /*recuperando nick do player 2*/
                var jogador_2 = $('#entrada_apelido_jogador_2').val();

                alert(jogador_2 + ' É o vencedor');
 
                $('.jogada').off();               
            }
        }
    

});