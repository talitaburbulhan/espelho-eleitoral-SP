fetch("./dados_calculadora.json")
.then(response => {
   return response.json();
})
.then(jsondata => run(jsondata));

let generos = document.querySelectorAll('input[name="genero"]')

let anos = document.querySelector('.input-ano') // aqui eu crio uma variável que armazena a minha referência para o html, mais especificamente para o elemento que tem a classe input-ano

let grausDeInstrucao = document.querySelector('.instrucao')

let estadosCivis = document.querySelector('.estadoCivil')

let racas = document.querySelector('.raca')

let opcoes = {     // objeto d estado 
   ano: undefined,
   genero: undefined,
   grauInstrucao: undefined,
   estadoCivil: undefined,            
   raca: undefined   
} 

let dados = undefined

function run(jsondata) { // criei a função run para que os meus dados em json não desaparecessem. Todo o restante do meu código roda dentro dela.  

   dados = jsondata

   anos.addEventListener( 'input', atualizarOpcoes)

   
   for (let genero of generos){

      genero.addEventListener('change', atualizarOpcoes)  // aqui coloca um monitor de eventos para cadauma das opções de gênero 

   }

   grausDeInstrucao.addEventListener('change', atualizarOpcoes)

   estadosCivis.addEventListener('change', atualizarOpcoes)
   
   racas.addEventListener('change', atualizarOpcoes)
   
}



function atualizarOpcoes() {

   if (anos.value.length == 4) {
      opcoes.ano = anos.value
   } 

  

   for (let genero of generos){

     if (genero.checked) {    // está vendo se o input de radio está selecionado
      opcoes.genero = genero.value // se estiver marcado, guarde no objeto de estado o gênero selecioando. 
      
     }
           
   }

   for (let grauInstrucao of grausDeInstrucao) {

      if (grauInstrucao.selected){
         opcoes.grauInstrucao = grauInstrucao.value
      }

   }

   for (let estCivil of estadosCivis) {

      if (estCivil.selected){
         opcoes.estadoCivil = estCivil.value
      }

   }

   for (let raca of racas) {

      if (raca.selected){
         opcoes.raca = raca.value
      }

   }
    
   

  filtrar() 

}

function filtrar() { 

   let contador = 0

   
   for (let dado of dados){  // olha cada linha da planilha e ve se o genero que a pessoa selecionou bate com o do candidato 
      
       if ((dado.ANO == parseInt (opcoes.ano)) && (dado.DS_GENERO == opcoes.genero) && (dado.DS_GRAU_INSTRUCAO == opcoes.grauInstrucao) && (dado.DS_ESTADO_CIVIL == opcoes.estadoCivil) && (dado.DS_COR_RACA == opcoes.raca) )   {  // está vendo se a informação do json está batendo com a informação que eu tinha armazaenado lá em cima (que é o genero selecionado)
      contador++         // se as infos baterem, soma 1
      }
   
   }
   

   mostrar(contador)
        
}

function mostrar(contador) {
   
  document.querySelector('.contagem').textContent = contador
  document.querySelector('.porcentagem').textContent = ((contador * 100) / dados.length).toFixed(3)+"%"  
                          // Se começa com letra maiúscula é pq normalmente é uma lcasse, um tipo de objeto 
  
  
}




  