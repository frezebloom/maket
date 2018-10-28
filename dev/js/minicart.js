class Minicart {
  open() {
    const minicartPanel = document.querySelector(".minicart");
    const minicartButton = document.querySelector(".shopping_cart_button");
    minicartButton.addEventListener("click", () => {
      minicartPanel.style.marginRight = "0px";
    });
  }
}

export default Minicart;
