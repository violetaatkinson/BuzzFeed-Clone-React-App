import {useEffect, useState, forwardRef} from 'react'
//answerOptions={quiz?.answers} entramos en quiz con el fetch db y ahi agarramos las respuestas


const Answer = ({answerOptions, chosenAnswers}, ref) => {
    const [result, setResult] = useState(null)

    useEffect(() => {
        answerOptions.forEach(answer => { // sobre todas esas respuestas iteramos y hacemos la combinacion de esas 3 respuestas
                                         // y devolvemos una
            if (chosenAnswers.includes(answer.combination[0]) && // entro al array 0 y lo mismo con los demas y si lo incluye
                chosenAnswers.includes(answer.combination[1]) &&
                chosenAnswers.includes(answer.combination[2])
            ) {
                setResult(answer) // si cumple esas 3 condiciones de combinaciones seteo el resultado a la respuesta final
            } else if (!result) {
                setResult(answerOptions[0])
            }
        })
    }, [result])

 // si existe un resultado mostramos un texto y una imagen que seria el queso
    return (
        <div ref={ref} className="answer-block"> 
            <h2>{result?.text}</h2>
            <img src={result?.image} alt={result?.text}/>
        </div>
    )
}

export default forwardRef(Answer)
