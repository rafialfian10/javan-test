// components react
import { useNavigate } from "react-router-dom";

// component react bootstrap
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

// css
import "./Logout.scss";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          text: "Logout Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/");
          window.location.reload();
        });
      }
    });
  };

  return (
    <>
      <Button onClick={handleLogout} className="btn-logout" variant="btn btn-danger">
        Logout
      </Button>
    </>
  );
};

export default Logout;
