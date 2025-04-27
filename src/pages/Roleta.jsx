import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeftIcon, Shuffle } from "lucide-react"
import { useNavigate } from "react-router-dom";

function Roleta(){
    const [opcoes, setOpcoes] = useState([
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
    ])
    const navigate = useNavigate()
    let [sorteados, setSorteados] = useState([])
    let [sorteio, setSorteio] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isSorting, setIsSorting] = useState(false)
    
    function roletada() {
        let sorteioDuplicado;
        let novoSuposto;
        [novoSuposto, sorteioDuplicado] = verificaSorteio();
        while (sorteioDuplicado || novoSuposto === undefined) {
          [novoSuposto, sorteioDuplicado] = verificaSorteio();
        }
        setSorteio(novoSuposto);
        setSorteados((prevSorteados) => [...prevSorteados, novoSuposto]);
      }
    
      function verificaItens() {
        if (isSorting) return; // se já está sorteando, ignora novo clique
        setIsSorting(true);     // trava o botão
        
        if (sorteados.length === opcoes.length) {
          alert("Todos os itens já foram sorteados!");
        } else {
          roletada();
        }
      
        // Libera o botão depois de um pequeno delay
        setTimeout(() => setIsSorting(false), 300);
      }
    
    function verificaSorteio() {
        let novoSuposto = opcoes[Math.floor(Math.random() * opcoes.length)];
        let sorteioDuplicado = sorteados.includes(novoSuposto);
        return [novoSuposto, sorteioDuplicado];
      }
    
    
    return (
        <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center h-screen bg-amber-950">
          <div className="w-full grid grid-cols-3 items-center text-white justify-center pb-6">
            <ChevronLeftIcon onClick={()=>{navigate(-1)}}/>
            <h1 className="text-2xl font-bold text-center text-white">Roleta</h1>
          </div>
    
          {/* Current word display */}
          <div className="w-full bg-amber-100 rounded-lg shadow-lg p-6 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Palavra da vez</p>
            {sorteio ? (
              <p className="text-3xl font-bold text-amber-950">{sorteio}</p>
            ) : (
              <p className="text-xl text-gray-600 italic">Clique no botão para sortear um número</p>
            )}
          </div>
    
          {/* Raffle button */}
          <button
            onClick={verificaItens}
            className="w-full py-4 px-6 bg-amber-600 text-amber-950 rounded-lg font-bold text-xl mb-6 flex items-center justify-center gap-2 hover:bg-amber-700 active:bg-amber-800 transition-colors"
          >
            <Shuffle className="w-6 h-6" />
            Roletar
          </button>
    
          
    
          {/* Selected words dropdown */}
          <div className="w-full bg-amber-100 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 flex items-center justify-between bg-amber-100 border-b border-amber-900 text-black"
            >
              <span className="font-medium text-amber-950">Palavras sorteadas({sorteados.length})</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
    
            {isDropdownOpen && (
              <div className="max-h-60 overflow-y-auto">
                {sorteados.length > 0 ? (
                  <ul className="divide-y divide-amber-900">
                    {sorteados.map((word, index) => (
                      <li key={index} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-amber-100 rounded-full text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="font-medium text-amber-950">{word}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-center text-gray-500 italic">Nenhuma palavra foi sorteada ainda</p>
                )}
              </div>
            )}
          </div>
    
          {/* Word count indicator */}
          <div className="w-full mt-4 bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-amber-600 h-2.5 rounded-full"
              style={{ width: `${(sorteados.length / opcoes.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            {sorteados.length} de {opcoes.length} palavras sorteadas
          </p>
        </div>
      )
}
export default Roleta