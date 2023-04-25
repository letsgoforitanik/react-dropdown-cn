import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.css";

export default function Dropdown({ items, onItemSelected, currentIndex }) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(currentIndex ?? -1);
    useEffect(() => setDocumentClick(), []);

    // document click is captured
    function setDocumentClick() {
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }

    // on cliking outside of the dropdown,
    // we will close the dropdown
    function handleDocumentClick() {
        setShowMenu(false);
    }

    // here we stop event bubbling to undertand
    // when clicks are made outside of the document
    // also menu is closed when an item is clicked
    function handleDropdownClick(event) {
        event.stopPropagation();
        setShowMenu(false);
    }

    // on hover menu is shown
    function handleMouseEnter() {
        setShowMenu(true);
    }

    function handleItemClick(index) {
        setSelectedIndex(index);
        onItemSelected && onItemSelected(index, items[index]);
    }

    return (
        <div className={styles.dropdown} onMouseEnter={handleMouseEnter} onClick={handleDropdownClick}>
            <div className={`${styles.ddButton}${showMenu ? ` ${styles.show}` : ""}`}>
                {selectedIndex === -1 ? "Select item" : items[selectedIndex]}
            </div>

            {showMenu && (
                <ul className={styles.ddMenu}>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={index === selectedIndex ? styles.selected : ""}
                            onClick={() => handleItemClick(index)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
