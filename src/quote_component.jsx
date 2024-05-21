import React, {useState, useEffect} from "react";

function QuoteComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState('New Quote')
    const[quote, setQuote] = useState('');
    const[author, setAuthor] = useState('');
    const url = 'https://zenquotes.io/api/quotes'
    
    useEffect(()=>{
        const getQuote = async () => {
            setIsLoading(true)
            const response = await fetch(url);
            const quoteObject = await response.json();
            setQuote(quoteObject[0].q)
            setAuthor(quoteObject[0].a)
            setIsLoading(false)
        }
       getQuote() 
    }, [])

    const getQuote = async () => {
        setButtonText('Loading...')
        const response = await fetch(url);
        const quoteObject = await response.json();
        setQuote(quoteObject[0].q)
        setAuthor(quoteObject[0].a)
        setButtonText('New Quote')
    }
    
    if (isLoading) {
        return <div className='loading'><h2>Loading...</h2></div>
    }
    
    return(
        <div id="quote-box">
            <div className="text-author">
                <p id='text'>"{quote}"</p>
                <p id='author'>- {author}</p>   
            </div>
            
            <div id="buttons">
                <button id='new-quote' onClick={getQuote}>{buttonText}</button>
                <a id='tweet-quote' href='twitter.com/intent/tweet' target="_blank"><i class="fab fa-twitter" id='tweeter-icon' /></a>                
            </div>            
        </div>
    )
}

export default QuoteComponent