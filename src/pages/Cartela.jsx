import { ChevronLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cartela(){
    const opcoes = [
        "Copos",
        "Tapetes para cozinha",
        "Panos de prato",
        "Travessas",
        "Abridor de latinha",
        "Tábua de corte",
        "Saleiro",
        "Jarra",
        "Vasilhas",
        "Peneiras",
        "Amolador de facas",
        "Abridor de vinho",
        "Rodo de pia",
        "Taça",
        "Ralador",
        "Balde",
        "Vassoura",
        "Pá",
        "Rodo",
        "Panos de limpeza",
        "Cesto de roupa",
        "Cesto para prendedor",
        "Pano de chão",
        "Cabides",
        "Lixeiras para banheiro",
        "Tapetes para banheiro",
        "Porta escova de dentes",
        "Escova sanitária",
        "Porta sabonete líquido"
    ]
    const navigate = useNavigate()
    const [matriz, setMatriz] = useState([])
    let opcao;

    function checkOpcao(){
        opcao = opcoes[Math.floor(Math.random()*opcoes.length)]
        let isDuplicate = false
        for(let k = 0; k<matriz.length;k++){
            for(let l = 0; l<matriz[k].length;l++){
                if(opcao == matriz[k][l]){
                    isDuplicate = true
                }
            }
        }
        return [opcao, isDuplicate]
    }

    function geraCartela() {
        const novaMatriz = []
        const usedNumbers = new Set()
    
        for (let i = 0; i < 5; i++) {
          const linha = []
          for (let j = 0; j < 5; j++) {
            if (i === 2 && j === 2) {
              linha.push({ value: "", marked: false, isFreeSpace: true })
            } else {
              let opcao, duplicado
              do {
                [opcao, duplicado] = checkOpcao(usedNumbers)
              } while (duplicado || opcao === undefined)
    
              usedNumbers.add(opcao)
              linha.push({ value: opcao, marked: false, isFreeSpace: false })
            }
          }
          novaMatriz.push(linha)
        }
        return novaMatriz
      }
    

  useEffect(() => {
    // Generate a new bingo card when component mounts
    setMatriz(geraCartela())
  }, [])

  const toggleMark = (rowIndex, colIndex) => {
    if (matriz[rowIndex][colIndex].isFreeSpace) return

    const newCard = [...matriz]
    newCard[rowIndex][colIndex].marked = !newCard[rowIndex][colIndex].marked
    setMatriz(newCard)
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-md w-full h-screen mx-auto p-2 bg-amber-950">
      {/* BINGO header */}
      <div className="w-full mb-6">
          <div className="bg-amber-700 w-full text-white text-center py-2 font-bold text-xl rounded-md grid grid-cols-3 items-center px-4">
            <ChevronLeftIcon onClick={()=>{navigate(-1)}}/>
            <p className="text-nowrap">Bingo de casa</p>
          </div>
      </div>

      {/* Bingo card grid */}
      <div className="grid grid-cols-5 gap-1 max-w-md w-full">
        {matriz.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square flex items-center justify-center text-xs font-medium rounded-md p-2
                ${cell.marked ? "bg-orange-200 text-black" : "bg-amber-950 text-white"} 
                ${cell.isFreeSpace ? "bg-amber-200" : ""}
                border-2 ${cell.marked ? "border-amber-600" : "border-amber-800"}
                active:scale-95 transition-all duration-100
              `}
              onClick={() => toggleMark(rowIndex, colIndex)}
            >
              {cell.value}
            </button>
          )),
        )}
      </div>

      <button
        onClick={() => setMatriz(geraCartela())}
        className="mt-6 w-full py-3 bg-amber-700 text-white rounded-md font-bold hover:bg-amber-800 active:bg-amber-900"
      >
        Nova cartela
      </button>
    </div>
  )

}

export default Cartela