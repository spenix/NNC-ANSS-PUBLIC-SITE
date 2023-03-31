import '../../styles/animation.css';


export default ({loadingType}) => {

    const Loading = (param) => {
        switch (param) {
            case 1:
                return (
                    <div className="load-wrapp">
                    <div className="load-1">
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                )
            break;
            case 2:
                return (
                    <div className="load-wrapp">
                    <div className="load-2">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    </div>
                )
            break;
            case 3:
                    return (
                        <div className="load-wrapp">
                        <div className="load-3">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                        </div>
                    )
            break;
            case 4:
                    return (
                        <div className="load-wrapp">
                        <div className="load-4">
                            <div className="ring-1"></div>
                        </div>
                        </div>
                    )
            break;
            case 5:
                    return (
                        <div className="load-wrapp">
                        <div className="load-5">
                            <div className="ring-2">
                            <div className="ball-holder">
                                <div className="ball"></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    )
            break;
            case 6:
                    return (
                        <div className="load-wrapp">
                        <div className="load-6">
                        <div className="letter-holder">
                            <div className="l-1 letter">L</div>
                            <div className="l-2 letter">o</div>
                            <div className="l-3 letter">a</div>
                            <div className="l-4 letter">d</div>
                            <div className="l-5 letter">i</div>
                            <div className="l-6 letter">n</div>
                            <div className="l-7 letter">g</div>
                            <div className="l-8 letter">.</div>
                            <div className="l-9 letter">.</div>
                            <div className="l-10 letter">.</div>
                        </div>
                        </div>
                        </div>
                    )
            break;
            case 7:
                    return (
                        <div className="load-wrapp">
                        <div className="load-7">
                            <div className="square-holder">
                            <div className="square"></div>
                            </div>
                        </div>
                        </div>
                    )
            break;
            case 8:
                    return (
                        <div className="load-wrapp">
                    <div className="load-8">
                        <div className="line"></div>
                    </div>
                    </div>
                    )
            break;
            case 9:
                    return (
                        <div className="load-wrapp">
                        <div className="load-9">
                            <div className="spinner">
                            <div className="bubble-1"></div>
                            <div className="bubble-2"></div>
                            </div>
                        </div>
                        </div>
                    )
            break;
            case 9:
                    return (
                        <div className="load-wrapp">
                        <div className="load-10">
                            <div className="bar"></div>
                        </div>
                        </div>
                    )
            break;  
    
            default:
                return ("Loading ...");
                break;
        }

    }


    return (
        <>
            {Loading(loadingType)}
        </>
    );
}