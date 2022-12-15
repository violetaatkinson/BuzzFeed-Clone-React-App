
const Questions = ({  quizItemId,
                      question, 
                      setChosenAnswerItems,
                      chosenAnswerItems,
                      unansweredQuestionIds, 
                      setUnansweredQuestionIds 
}) => {

  const handleClick = () => {
    // add to an array we need the prevState , get the prev and add the q.text
    //  cuando apretamos en una imagen del array de los id solo me quiero quedar con la que he apretado
    // ese id viene de questionB
    setChosenAnswerItems((prevState) => [...prevState, question.text])
    setUnansweredQuestionIds(unansweredQuestionIds.filter((id) => id !== quizItemId))
  
}

  const validPick = !chosenAnswerItems?.includes(question.text) &&
        !unansweredQuestionIds?.includes(quizItemId)

    return (
     <button 
        className="question-block"
        onClick={handleClick}
        disabled={validPick}
     >
        <img src={question.image} alt={question.alt}/>
        <h3>{question.text}</h3>
        <p>
            <a href={question.image}>{question.credit} </a>
            <a href="https://www.unsplash.com">Unsplash</a>
        </p>
     </button>
    );
  }
  
  export default Questions;
