import React from 'react';
import ReactDOM from 'react-dom';




document.addEventListener('DOMContentLoaded', () => {

    class LearningCss extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                progress: 0,
                money: 0,
                time: 3000,
                upgrade: 400,
                lvl: 1,
                interval:100,
                addMoney:100,
                canClick: true,
            }
        }
        handleOnClick = () => {
            if(this.state.canClick){
                const intervalId = setInterval( () => {
                    this.setState({
                        progress: this.state.progress+10,
                        time: this.state.time-this.state.interval,
                        canClick: false,
                    })

                    if(this.state.progress>=300){
                        clearInterval(intervalId);
                        this.setState({
                            progress: 0,
                            money: this.state.money+this.state.addMoney,
                            time: 3000,
                            canClick: true,
                        })
                    }
                }, this.state.interval);

            }
        }

        handleBuyClick = () => {
            if(this.state.money >= this.state.upgrade){
                if(this.state.interval>1){
                    this.setState({
                        lvl: this.state.lvl+1,
                        interval: this.state.interval-5,
                        money: this.state.money-this.state.upgrade,
                        upgrade: this.state.upgrade*2,
                        addMoney:this.state.addMoney*(5/4),
                    })
                }
            }
        }

        render(){

            const progressStyle = {
                width: this.state.progress+"px",
            }

            return(
                <div>
                    <div>Money: {this.state.money}$</div>
                    <div className={"flex"}>
                        <div
                            onClick={this.handleOnClick}
                            className={"circle"}>
                            {this.state.lvl}/100

                        </div>
                        <div className={"info"}>
                            <div className={"progressBar"}>
                                <div className={"progress"} style={progressStyle}></div>
                            </div>
                            <div className={"additionalBtns"}>
                                <div
                                    onClick={this.handleBuyClick}
                                    className={"buyBtn"}>
                                    <p>Buy</p>
                                    <p>{this.state.upgrade}$</p>
                                </div>
                                <div>Time: {this.state.time}ms</div>
                            </div>
                        </div>

                    </div>
                </div>


            );
        }
    }

    class App extends React.Component {
        render() {
            return (
               <LearningCss/>
            );

        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );

});

