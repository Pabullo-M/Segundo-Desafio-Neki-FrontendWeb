import { useState } from "react";
import { FormTitle, IconButton, InputContainer, StyledContainer, StyledDiv, StyledForm } from "./index.styles";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { loginApi, LoginData } from "@/api";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header/Header";

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [SenhaInvisivel, setSenhaInvisivel] = useState<boolean>(true);
  const navigate = useNavigate();


  const handleOnSubmit = async (data: LoginData) => {
    try {
        const response = await loginApi(data); 
        console.log('Login bem-sucedido:', response);
        localStorage.setItem("tokenUsuario",response.token);
        navigate('/Home')
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert(error.message); 
    }
};



  return (

<>
    <Header/>
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(handleOnSubmit)} method="POST">
        <FormTitle>Login</FormTitle>
        <InputContainer className="relative w-full">
          <EnvelopeClosedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md"
            placeholder="E-Mail"
            type="email"
            title="Digite seu E-Mail."
            {...register("email")}
          />
        </InputContainer>
        <InputContainer className="relative w-full">
          <IconButton
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => {
              setSenhaInvisivel((prevState) => !prevState);
            }}
          >
            {SenhaInvisivel ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </IconButton>
          <Input
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md"
            placeholder="Senha"
            type={SenhaInvisivel ? "password" : "text"}
            title="Digite sua Senha."
            {...register("senha")}
          />
        </InputContainer>
        <Button type="submit">Entrar</Button>
      </StyledForm>
      <StyledDiv>
        <a href="perfil">
          <p>Acesso sem Login</p>
        </a>
      </StyledDiv>
    </StyledContainer>
</>
  );
};
