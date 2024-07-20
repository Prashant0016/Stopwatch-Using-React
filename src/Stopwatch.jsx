import React , {useState , useEffect , useRef } from "react";

function Stopwatch(){

    const[IsRunning , SetIsRunning] = useState(false);                          // State for tracking if stopwatch is running
    const[ElapsedTime , SetElapsedTime] = useState(0);                          // State for elapsed time in milliseconds
    const IntervalIdRef = useRef(null);                                         // Reference to store interval ID for setInterval
    const StartTimeRef = useRef(0);                                             // Reference to store start time when stopwatch starts

    useEffect(() => {
        if(IsRunning){                                                          // Effect runs when IsRunning state changes
            IntervalIdRef.current = setInterval(() => {                         // Start interval when stopwatch starts
                SetElapsedTime(Date.now() - StartTimeRef.current);              // Update ElapsedTime every 10 milliseconds
            },10);
        }

        // Date.now() gives the current timestamp in milliseconds. It return no of ms elapsed since 1 Jan , 1970 (UTC).
        // StartTimeRef.current is the timestamp when the stopwatch started or last resumed. 

        return () => {                                                          // Cleanup function
            clearInterval(IntervalIdRef.current);                               // Clear interval when stopwatch stops
        }
    })

    function Start(){                                                           // Start func
        SetIsRunning(true);                                                     // Set IsRunning to true
        StartTimeRef.current = Date.now() - ElapsedTime;                        // Record start time adjusted by elapsed time
    }

    function Stop(){                                                            // Stop func
        SetIsRunning(false);                                                    // Set IsRunning to false
    }

    function Reset(){                                                           // Reset func
        SetElapsedTime(0);                                                      // Reset ElapsedTime to 0
        SetIsRunning(false);                                                    // Set isRunning to false
    }

    function FormatTime(){                                                      // Function to format the elapsed time into hours : minutes : seconds : milliseconds format
        let hours = Math.floor(ElapsedTime / (1000*60*60));
        let minutes = Math.floor(ElapsedTime / (1000*60)%60);
        let seconds = Math.floor(ElapsedTime / (1000)%60);
        let milliseconds = Math.floor((ElapsedTime % 1000) / 10);

        hours = String(hours).padStart(2,"0");                                  // Format numbers to always display two digits
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");

        return `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;           // Return formatted time string

    }

    return(
        <>
            <header>STOPWATCH</header>
            <div className="stopwatch-container">
                <div className="stopwatch-time">
                    {FormatTime()}
                </div>
                <div className="stopwatch-btns">
                    <button className="start-btn" onClick={Start}>START</button>
                    <button className="stop-btn"  onClick={Stop}>STOP</button>
                    <button className="reset-btn" onClick={Reset}>RESET</button>
                </div>

            </div>

        </>
    );
}

export default Stopwatch;