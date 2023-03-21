import { useState } from 'react';


function Hang() {
    const [dashes, setDashes] = useState('');

    const [entry, setEntry] = useState('');
    const [guess, setGuess] = useState('');
    const [used, setUsed] = useState('');

    const [showEnter, setShowEnter] = useState(true);

    const [hideReset, setHideReset] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [loseScreen, setLoseScreen] = useState(false);
    const [winScreen, setWinScreen] = useState(false);
    
    const [CounterWin, setCounterWin] = useState(0);
    const [CounterLose, setCounterLose] = useState(0);

    const entering = (event) => {
    setEntry(event.target.value);
};
    const guessing = (event) =>{
        setGuess(event.target.value)
};

    const start = () => {
        let dash = ""
        let counter = 0
        for(let i = 0 ; i < entry.toUpperCase().length ; i++){
            if(entry[i] === " "){
                dash = dash + " "
                counter = counter + 1

            }
            else{
            dash = dash + "_"                 
            }

        }

        setDashes(dash);
        setShowEnter(false)
        setHideReset(true)
        setShowGame(true)
        setUsed("")
        setCounterWin(counter)
        setCounterLose(4)
    
};

    const check = () =>{
        let dash = Array.from(dashes);
        let change = false;  
        let counter = CounterWin;
        let isAlreadyUsed = used.includes(guess);

        if(!isAlreadyUsed){
            setUsed(used + guess)

            for(let i = 0 ; i < entry.length; i++){
                if(guess.toUpperCase() === entry[i].toUpperCase()){

                    dash[i] = guess 
                    change = true;
                    counter += 1;
                    if(counter === entry.length){
                        setWinScreen(true)
                        setShowGame(false)
                    }

                }
                if(!change){
                    if(CounterLose === 0){
                        setLoseScreen(true)
                        setShowGame(false)
                    }
                    else{
                        setCounterLose(CounterLose -1)
                    }
                }
            }

            setDashes(dash)
            setCounterWin(counter)

        }
};
    const reset = () =>{
        setShowEnter(true)
        setHideReset(false)
        setShowGame(false)
        setLoseScreen(false)
        setWinScreen(false)
};

  return (
    <div id='all'>
            <h1>Guessing game</h1>

            { showEnter &&
            <div id='enter'>
                <input 
                    type="text"
                    className='input_value'
                    id="message"
                    name="message" 
                    maxLength={30} 
                    onChange={entering} 
                    value={entry} 
                    placeholder="wpisz hasło"/><br/><br/>
                <button onClick={start} style={{marginBottom : "10px"}} className="button_do">Rozpocznij</button>
            </div>
            }

            {showGame && 
            <div>
                <p style={{letterSpacing: "3px"}}>{dashes}</p>
                <input 

                    type="text" 
                    id="guess" 
                    name = 'guess' 
                    maxLength={1} 
                    onChange={guessing} 
                    value={guess} 
                    placeholder="wpisz literę"
                    style = {{textAlign : "center"}}/><br/>

                <p>Ilość pozostałych prób : {CounterLose}</p>
                <p>Wykorzystane litery : {used} </p>

                <button onClick={check} className="button_do">Sprawdz</button><br/>
            </div>
            }

            {loseScreen &&
            <div className='WinLose' style={{backgroundColor : "red"}}>
                <p>PRZEGRAŁEŚ<br/>Hasło to : {entry}</p>
            </div>
            }  
            {winScreen &&
            <div className='WinLose' style={{ backgroundColor : "green"}}>
                <p >WYGRAŁEŚ<br/>Hasło to : {entry}</p>
            </div>
            }              

            { hideReset && 
            <div><br/>
                <button onClick={reset} style={{marginBottom : "10px"}} className="button_do">Zresetuj</button>
            </div>
            }
    </div>
  );
}


export default Hang