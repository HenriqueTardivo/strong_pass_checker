import { useRef, useState } from "react";
import * as Yup from "yup";
import { containerStyle, erroText, formStyle, inputStyle } from "../Styles";
import { useNavigate } from "react-router-dom";
const senhaSchema = Yup.object().shape({
  senha: Yup.string()
    .min(9, "A senha deve ter no mínimo 9 caracteres")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caracter especial (!@#$%^&*)"
    )
    .required("Senha é obrigatória"),
  confirmaSenha: Yup.string()
    .oneOf([Yup.ref("senha")], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export function Form() {
  const refSenha = useRef<HTMLInputElement>(null),
    refConfirma = useRef<HTMLInputElement>(null);

  const [isClickable, setIsClickable] = useState<boolean>(false),
    [isHovering, setIsHovering] = useState<boolean>(false),
    [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const onHover = async () => {
    try {
      await senhaSchema.validate({
        senha: refSenha?.current?.value,
        confirmaSenha: refConfirma?.current?.value,
      });

      setIsClickable(true);
      setError("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setIsHovering(!isHovering);
        setError(error.message);
      }
    }
  };

  const onClick = (e: any) => {
    e.preventDefault();
    if (!isClickable) return false;

    navigate("/success");
  };

  return (
    <div style={containerStyle}>
      <form action="none" style={formStyle}>
        <br />
        <label htmlFor="email" style={{ textAlign: "start" }}>
          Senha
        </label>
        <input type="password" name="email" ref={refSenha} style={inputStyle} />

        <br />
        <label htmlFor="senha" style={{ textAlign: "start" }}>
          Confirmar senha
        </label>
        <input
          type="password"
          name="senha"
          ref={refConfirma}
          style={inputStyle}
        />

        {error && (
          <>
            <br />
            <div>
              <span style={erroText}>{error}</span>
            </div>
          </>
        )}

        <button
          style={{
            width: "50%",
            marginTop: "15px",
            background: "#0096ff",
            borderRadius: "20px",
            transition: "200ms",
            marginLeft: isHovering ? "50%" : "0",
            marginRight: isHovering ? "0" : "50%",
          }}
          onMouseEnter={onHover}
          onClick={(e) => onClick(e)}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
