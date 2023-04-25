import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.css";

export default function Dropdown({ items, onItemSelected, selectedItemIndex }) {
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => addDocumentClickListener(), []);

    // document click listener
    function addDocumentClickListener() {
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }

    // document click listener is used to close the menu
    // because the objective is to close the menu whenever
    // a click occurs outside of the component
    const handleDocumentClick = () => setShowMenu(false);

    // on mouse hover, menu will be shown
    const handleMouseEnter = () => setShowMenu(true);

    // when menu is clicked, menu will be closed
    // also stopping the event propagation so that
    // it doesn't reach document
    function handleMenuClick(event) {
        event.stopPropagation();
        setShowMenu(false);
    }

    // raising onItemSelected event
    function handleMenuItemClick(index) {
        onItemSelected && onItemSelected(index);
    }

    function getButtonText() {
        const condition = !isNaN(selectedItemIndex) && selectedItemIndex >= 0 && selectedItemIndex < items.length;
        return condition ? items[selectedItemIndex] : "Select item";
    }

    return (
        <div className={styles.dropdown} onMouseEnter={handleMouseEnter}>
            <div className={`${styles.ddButton}${showMenu ? ` ${styles.show}` : ""}`}>{getButtonText()}</div>
            {showMenu && (
                <ul className={styles.ddMenu} onClick={handleMenuClick}>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleMenuItemClick(index)}
                            className={`${index === selectedItemIndex ? styles.selected : ""}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
