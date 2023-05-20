import React, { Component } from "react";
import Header from "../header/header";

import "./app.css";

export default class App extends Component {
  state = {
    buyItems: [],
    message: "",
    InputCallState: false,
    InputChangeItem: false,
  };

  inputStateHandler = () => {
    this.setState((state) => {
      return {
        ...state,
        InputCallState: true,
      };
    });
  };

  inputStateHandlerClose = () => {
    this.setState((state) => {
      return {
        ...state,
        InputCallState: false,
      };
    });
  };

  close = () => {
    this.setState((state) => {
      return {
        ...state,
        InputCallState: false,
      };
    });
  };

  addItem = (e) => {
    e.preventDefault();
    const { buyItems } = this.state;
    const newItem = this.newItem.value;
    const isOnTheList = buyItems.includes(newItem);

    if (isOnTheList) {
      this.setState({
        message: "Цей товар вже доданий до списку",
      });
    } else {
      newItem !== "" &&
        this.setState({
          buyItems: [...this.state.buyItems, newItem],
          message: "",
        });
    }

    this.addForm.reset();
  };

  removeItem = (item) => {
    const newBuyItems = this.state.buyItems.filter((buyItem) => {
      return buyItem !== item;
    });

    this.setState({
      buyItems: [...newBuyItems],
    });

    if (newBuyItems.length === 0) {
      this.setState({
        message: "Ваш список пустий",
      });
    }
  };

  clearAll = () => {
    this.setState({
      buyItems: [],
      message: "Ваш список пустий",
    });
  };


  toggleHandler = (e) => {
    let butt = document.querySelectorAll(".btn-done");
  
    if (e.currentTarget.value === 0){
      for (let i = 0; i < butt.length; i++) {
        butt[i].addEventListener("click", function (e) {
          console.log(e.target.getAttribute("id"));
          e.target.parentNode.classList.add("done");
        });
      }
    } else if (e.currentTarget.value !== 0) {
      e.target.parentNode.classList.add("done-1");
    }
    else {
      e.target.parentNode.classList.add("done");
    }
  };


  render() {
    const { buyItems, message } = this.state;
    return (
      <div>
        <Header></Header>

        <form
          ref={(input) => (this.addForm = input)} action="" className="form-inline" onSubmit={(e) => {this.addItem(e);}}>
          <div className="form-group">
            <button onClick={this.inputStateHandler} className="start">Додати новий товар +</button>

            {this.state.InputCallState ? (
              <div className="new-product">
                <input type="text" className="form-control" id="newItemInput" ref={(input) => (this.newItem = input)}/>
                <button type="submit" className="btn">&#128192;</button>
              </div>
            ) : null}

          </div>
        </form>

        <div className="content">
          {(message !== "" || buyItems.length === 0) && (
            <p className="message">{message}</p>
          )}

          {buyItems.length > 0 && (
            <table className="table"> 
             <tbody>
                {buyItems.map((item, index) => {
                  return (
                    <tr key={index} id={index}>
                      <td className="num">{index + 1}</td>
                      <td id={"text" + index}>
                        <input type="text" className="text-content" placeholder={item}/>
                        <button type="submit" id={"btnChange" + index} className="btn btn-change">&#9997;</button>
                        <button type="button" className="btn btn-done" id={"btnDone" + index} onClick={this.toggleHandler}>&#9989;</button>
                        <button onClick={(e) => this.removeItem(item)} type="button" className="btn btn-remove">&#10060;</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td>&nbsp;</td>
                  <td className="text-clear">
                    <button onClick={(e) => this.clearAll()} className="btn btn-clear">Очистити список</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    );
  }
}
