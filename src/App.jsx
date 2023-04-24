import React, { useState } from "react";
import Dropdown from "./Dropdown";
import "./index.css";

export default function App() {
    const fruits = ["Apple", "Strawberries", "Mango", "Banana", "Lemon", "Watermelon", "Papaya", "Avocado"];
    const [selectedItem, setSelectedItem] = useState(null);

    function handleDropdownItemSelect(index) {
        setSelectedItem(fruits[index]);
    }

    return (
        <div className="App">
            <Dropdown items={fruits} onItemSelected={handleDropdownItemSelect} />
            {selectedItem && <h3>Selected Item is : {selectedItem}</h3>}
        </div>
    );
}
