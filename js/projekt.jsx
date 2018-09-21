import React from 'react';
import ReactDOM from 'react-dom';




document.addEventListener('DOMContentLoaded', () => {

    class NewTask extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                progress: this.props.progress,
                money: this.props.money,
                time: this.props.time,
                time2: this.props.time,
                substractTime: this.props.substractTime,
                upgrade: this.props.upgrade,
                lvl: this.props.lvl,
                interval: this.props.interval,
                addMoney: this.props.addMoney,
                canClick: this.props.canClick,
            }
        }
        handleOnClick = () => {
            if(this.state.canClick){
                const intervalId = setInterval( () => {
                    const inter = (300/(this.state.time2/this.state.interval));
                    this.setState({
                        progress: this.state.progress+inter,
                        time: this.state.time-this.state.interval,
                        canClick: false,
                    })

                    if(this.state.progress>300){
                        this.setState({
                            progress: 0,
                            time: this.state.time2,
                            canClick: true,
                        });
                        this.props.changeMoney(this.state.addMoney);
                        clearInterval(intervalId);
                    }
                }, this.state.interval);

            }
        }

        handleBuyClick = () => {
            if(this.props.money >= this.state.upgrade
                && this.state.lvl <100
                && this.state.canClick
                && this.state.time>100
            ){
                    this.setState({
                        lvl: this.state.lvl+1,
                        upgrade: this.state.upgrade*1.2,
                        addMoney:this.state.addMoney*(5/4),
                        time: this.state.time-this.state.substractTime,
                        time2: this.state.time2-this.state.substractTime,
                    })

                    this.props.changeMoney(-this.state.upgrade);
            }
        }


        render(){

            const progressStyle = {
                width: this.state.progress+"px",
            }

            return(
                <div>
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
                                    <p>{Math.ceil(this.state.upgrade)}$</p>
                                </div>
                                <div className={"timeLeft"}>Time: {this.state.time}ms</div>
                            </div>
                        </div>

                    </div>
                </div>


            );
        }
    }

    class CreateGame extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                money: 0,
            }
        }

        handleMoneyChange = (amount) => {
            this.setState({
                money: this.state.money+amount,
            });

        }

        render(){
            return (
                <div className={"mainContainer"}>
                    <div className={"money"}><
                        p>Your money: {Math.floor(this.state.money)}$</p>
                    </div>
                    <div className={"gameContainer"}>
                        <div className={"task"}>
                            <NewTask
                                changeMoney={this.handleMoneyChange.bind(this)}
                                progress={0}
                                money={this.state.money}
                                time={3000}
                                substractTime={50}
                                upgrade={400}
                                lvl={1}
                                interval={100}
                                addMoney={100}
                                canClick={true}
                            />
                        </div>

                        <div className={"task"}>
                            <NewTask
                                changeMoney={this.handleMoneyChange.bind(this)}
                                progress={0}
                                money={this.state.money}
                                time={10000}
                                substractTime={100}
                                upgrade={3000}
                                lvl={1}
                                interval={100}
                                addMoney={250}
                                canClick={true}
                            />
                        </div>

                        <div className={"task"}>
                            <NewTask
                                changeMoney={this.handleMoneyChange.bind(this)}
                                progress={0}
                                money={this.state.money}
                                time={30000}
                                substractTime={200}
                                upgrade={8000}
                                lvl={1}
                                interval={100}
                                addMoney={500}
                                canClick={true}
                            />
                        </div>

                        <div className={"task"}>
                            <NewTask
                                changeMoney={this.handleMoneyChange.bind(this)}
                                progress={0}
                                money={this.state.money}
                                time={120000}
                                substractTime={1000}
                                upgrade={80000}
                                lvl={1}
                                interval={100}
                                addMoney={50000}
                                canClick={true}
                            />
                        </div>


                    </div>

                </div>
            );
        }
    }

    class App extends React.Component {
        render() {
            return (
                <CreateGame />
            );

        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );

});

