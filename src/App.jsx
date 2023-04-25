import React, { useState } from "react";
import Dropdown from "./Dropdown";
import "./index.css";

export default function App() {
    const fruits = ["Apple", "Strawberries", "Mango", "Banana", "Lemon", "Watermelon", "Papaya", "Avocado"];
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

    function handleDropdownItemSelect(selectedItemIndex) {
        setSelectedItemIndex(selectedItemIndex);
    }

    function isValidIndex() {
        const condition = !isNaN(selectedItemIndex) && selectedItemIndex >= 0 && selectedItemIndex < fruits.length;
        return condition;
    }

    return (
        <div className="App">
            <Dropdown items={fruits} onItemSelected={handleDropdownItemSelect} selectedItemIndex={selectedItemIndex} />
            {isValidIndex() && <h3>Selected Item is : {fruits[selectedItemIndex]}</h3>}
        </div>
    );
}
