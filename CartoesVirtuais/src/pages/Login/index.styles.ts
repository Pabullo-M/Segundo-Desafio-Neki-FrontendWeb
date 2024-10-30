import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin:6rem ;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  border:  1px solid #D3D3D3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 25rem;
  height:20rem ;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormTitle = styled.text`
  font-size: 24px;
  font-weight: bold;
  color: #999;
  margin-bottom: 16px;
  text-align: center;
`;

export const IconButton = styled.button`
  width:0px ;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none; 
  border: none; 
  cursor: pointer;
  color: #666;
  &:focus {
    outline: none; 
  }
`;

export const StyledDiv = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  border:  1px solid #D3D3D3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 25rem;
  height:5rem ;
  display: flex;
  justify-content: center ;
  align-items: center ;
`;