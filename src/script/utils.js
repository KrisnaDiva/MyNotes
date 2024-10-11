import Swal from "sweetalert2";
import anime from "animejs";

class Utils {
  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static showLoading(loadingIndicator) {
    loadingIndicator.classList.add("show");
  }

  static hideLoading(loadingIndicator) {
    loadingIndicator.classList.remove("show");
  }

  static showErrorMessage(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      confirmButtonColor: "#798645",
    });
  }

  static showSuccessMessage(message) {
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: message,
      confirmButtonColor: "#798645",
    });
  }

  static animateCard(card) {
    anime({
      targets: card,
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutElastic(1, .8)",
    });
  }

  static animateDelete(card) {
    return new Promise((resolve) => {
      anime({
        targets: card,
        translateX: "100%",
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        complete: function (anim) {
          card.remove();
          resolve();
        },
      });
    });
  }

  static animateButton(button) {
    anime({
      targets: button,
      scale: 1.2,
      duration: 200,
      direction: "alternate",
      easing: "easeInOutQuad",
    });
  }
}

export default Utils;
