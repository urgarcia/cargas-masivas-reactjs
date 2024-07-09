import Swal from "sweetalert2";

export const createTopNotification  = (timer = null, position = null) => {
  return Swal.mixin({
    toast: true,
    position: position ? position : "bottom-end",
    showConfirmButton: false,
    timer: timer ? timer : 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
};
