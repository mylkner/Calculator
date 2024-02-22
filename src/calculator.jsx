import "./calculatorStyle.css";
import { useState } from "react";

const Calculator = () => {
    const [inputValue, setInputValue] = useState("0");
    const [evaluated, setEvaluated] = useState(false);

    const display = (value) => {
        const decimalCount = decimalCounter();

        if (
            (evaluated || inputValue === "0") &&
            ["+", "-", "*", "/"].includes(value)
        ) {
            setInputValue(inputValue + value);
            setEvaluated(false);
            return;
        } else if (evaluated || inputValue === "Error" || inputValue === "0") {
            setInputValue(value);
            setEvaluated(false);
            return;
        } else if (
            (inputValue.slice(-1) === "." || decimalCount === 1) &&
            value === "."
        ) {
            setInputValue(inputValue);
            return;
        } else if (
            ["+", "-", "*", "/"].includes(inputValue.slice(-2, -1)) &&
            ["+", "-", "*", "/"].includes(inputValue.slice(-1)) &&
            ["+", "-", "*", "/"].includes(value)
        ) {
            setInputValue(inputValue.slice(0, -2) + value);
            return;
        } else if (
            ["+", "-", "*", "/"].includes(inputValue.slice(-1)) &&
            ["+", "*", "/"].includes(value)
        ) {
            setInputValue(inputValue.slice(0, -1) + value);
            return;
        } else {
            setInputValue(inputValue + value);
            return;
        }
    };

    const calculate = () => {
        try {
            setInputValue(parseFloat(eval(inputValue).toFixed(12)));
            setEvaluated(true);
            return;
        } catch (error) {
            setInputValue("Error");
            return;
        }
    };

    const backspace = () => {
        if (evaluated === true || inputValue === "Error") {
            setInputValue("0");
        } else if (inputValue.length !== 1) {
            setInputValue(inputValue.slice(0, -1));
        } else {
            setInputValue("0");
        }
    };

    const decimalCounter = () => {
        let decimalCount = 0;
        for (let i = 0; i < inputValue.length; i++) {
            if (inputValue[i] === ".") {
                decimalCount = 1;
            } else if (["+", "-", "*", "/"].includes(inputValue[i])) {
                decimalCount = 0;
            }
        }
        return decimalCount;
    };

    return (
        <div className="calculatorDiv">
            <form name="calc" className="calculator">
                <input
                    id="display"
                    type="text"
                    className="value"
                    value={inputValue}
                    readOnly={true}
                />
                <span
                    id="clear"
                    className="clear  bigBtn"
                    onClick={() => setInputValue("0")}
                >
                    C
                </span>
                <span className="clear" onClick={() => backspace()}>
                    CE
                </span>
                <span
                    id="divide"
                    onClick={() => display("/")}
                    className="operation"
                >
                    /
                </span>
                <span id="seven" onClick={() => display("7")}>
                    7
                </span>
                <span id="eight" onClick={() => display("8")}>
                    8
                </span>
                <span id="nine" onClick={() => display("9")}>
                    9
                </span>
                <span
                    id="multiply"
                    onClick={() => display("*")}
                    className="operation"
                >
                    *
                </span>
                <span id="four" onClick={() => display("4")}>
                    4
                </span>
                <span id="five" onClick={() => display("5")}>
                    5
                </span>
                <span id="six" onClick={() => display("6")}>
                    6
                </span>
                <span
                    id="subtract"
                    onClick={() => display("-")}
                    className="operation"
                >
                    -
                </span>
                <span id="one" onClick={() => display("1")}>
                    1
                </span>
                <span id="two" onClick={() => display("2")}>
                    2
                </span>
                <span id="three" onClick={() => display("3")}>
                    3
                </span>
                <span
                    id="add"
                    onClick={() => display("+")}
                    className="operation"
                >
                    +
                </span>
                <span id="zero" onClick={() => display("0")} className="bigBtn">
                    0
                </span>
                <span id="decimal" onClick={() => display(".")}>
                    .
                </span>
                <span
                    id="equals"
                    onClick={() => calculate()}
                    className="equals"
                >
                    =
                </span>
            </form>
        </div>
    );
};

export default Calculator;
