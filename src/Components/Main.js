import React, { Component } from 'react';

class Main extends Component {
    constructor (props) {
        super (props)
        this.state = {
            productList: [],
            cardList: [],
            tab: "PRODUCT"
        }
    }

    componentDidMount () {
        fetch ("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/item")
        .then (response => response.json())
        .then (data => {
            console.log (data);
            this.setState ({productList: data})
        })
    }
    
    Product = () => {
        
        const { productList } = this.state;
        
        return (<div>
            {
            productList.map((elem) => (<div className="products">
            <h2>{elem.name}</h2>
            <p>{elem.price}$</p>
            <button onClick = {() => this.Add(elem)}>Add</button>
            </div>))
            }
            </div>
        )
    }

    onProduct = () => {
    this.setState({tab: "PRODUCT"});
    }
    
    Card = () => { 
        const { cardList } = this.state;
        
        return (<div>
            {
            cardList.map((elem) => (<div className="cards">
            <h2>{elem.name + "  "}{elem.price}$</h2>
            <button onClick = {()=>this.Remove(elem)}> Remove</button>
            </div>))
            }
            </div>
        )
    }

    onCard = () => {
    this.setState ({tab: "CARD"});
    }
    
    Add = (elem) => {
        let expr = true;
        this.state.cardList.map((e) => {
            if(e.id === elem.id){
            console.log ("Allready exists!");
            expr = false;
            }
        })
        if (expr) {
        this.state.cardList.push (elem);
        console.log (this.state.cardList);
        this.setState ({tab: "PRODUCT"});
        }
    }

    Remove = (elem) => {
        this.state.cardList.map ((e, index) => {
            if (elem === e)
            this.state.cardList.splice (index, 1);
        })
        console.log (this.state.cardList);
        this.setState ({tab: "CARD"});
    }

    render() { 
        return (
            <div className="main">
                <div className="navbar">
                    <button onClick = {this.onProduct}>Product</button>
                    <button onClick = {this.onCard}>Card</button> 
                    <button className="counter">Selected{" " + this.state.cardList.length}</button>
                </div>
                {this.state.tab === "PRODUCT" ? <this.Product/> : <this.Card/>}
            </div>
        );
    }
}

export default Main;