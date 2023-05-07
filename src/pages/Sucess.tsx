import { useNavigate } from "react-router-dom";
import { containerStyle } from "../Styles";
import sucess from "../assets/success-svgrepo-com.svg";

export function Sucess() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 3000);

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={sucess}
          alt="Sucesso"
          style={{ width: "50px", height: "50px" }}
        />
        <span>Senha alterada com sucesso</span>
      </div>
    </div>
  );
}
