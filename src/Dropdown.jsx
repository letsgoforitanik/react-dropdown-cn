import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.css";

export default function Dropdown({ items, onItemSelected, selectedItemIndex }) {
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => addDocumentClickListener(), []);

    function addDocumentClickListener() {
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }

    const handleDocumentClick = () => setShowMenu(false);

    const handleMouseEnter = () => setShowMenu(true);

    function handleMenuClick(event) {
        event.stopPropagation();
        setShowMenu(false);
    }

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
