class Minicart {
  //Открыть <---> Закрыть Панель корзины товаров
  open() {
    let opened = false;
    const minicartPanel = document.querySelector(".minicart");
    const minicartButton = document.querySelector(".shopping_cart_button");
    const container = document.getElementsByClassName("container");
    minicartButton.addEventListener("click", () => {
      if (!opened) {
        minicartPanel.style.marginRight = "0px";
        for (let i = 0; i < container.length; i++) {
          container[i].style.marginRight = "450px";
        }
        opened = true;
      } else {
        minicartPanel.style.marginRight = "-350px";
        for (let i = 0; i < container.length; i++) {
          container[i].style.marginRight = "0px";
        }
        opened = false;
      }
    });
  }
}

export default Minicart;
