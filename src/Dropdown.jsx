import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.css";

export default function Dropdown({ items, onItemSelected }) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    useEffect(() => setDocumentClick(), []);

    function setDocumentClick() {
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }

    function handleDocumentClick() {
        setShowMenu(false);
    }

    function handleDropdownClick(event) {
        event.stopPropagation();
        setShowMenu(false);
    }

    function handleMouseEnter() {
        setShowMenu(true);
    }

    function handleItemClick(index) {
        setSelectedIndex(index);
        onItemSelected && onItemSelected(index);
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
