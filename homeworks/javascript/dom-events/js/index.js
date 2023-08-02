"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const ssComponent = new SelectSizeComponent(
        document.getElementById("newHamburger"),
        getHamburgerComponents("size")
    );

    ssComponent.onSizeSelection((size) => {
        const hamburger = new Hamburger(size);
        const fillingContainer = document.getElementById("hamburgerFilling");
        fillingContainer.style.display = "block";
        const hFComponent = new HamburgerFillingComponent(
            fillingContainer,
            getHamburgerComponents("topping"),
            getHamburgerComponents("stuffing")
        );
        hFComponent.setHamburger(hamburger);
    });
});

function getHamburgerComponents(type) {
    const components = [];
    const nameTemplate = type.toUpperCase() + "_";

    for (const prop in Hamburger) {
        if (Hamburger.hasOwnProperty(prop) && Hamburger[prop].id.startsWith(nameTemplate)) {
            components.push(Hamburger[prop]);
        }
    }

    return Object.freeze(components);
}

function formatPrice(value) {
    return "$" + value.toFixed(2);
}
