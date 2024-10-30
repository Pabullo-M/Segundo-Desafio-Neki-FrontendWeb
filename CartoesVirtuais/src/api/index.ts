import { UserCardProps } from '@/@types';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

export interface LoginData {
    email: string;
    senha: string;
}

interface LoginResponse {
    token: string;
    status: number;
}

export const loginApi = async (loginData: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/login", {
            email: loginData.email,
            senha: loginData.senha
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error?.response?.data?.titulo || 'Erro ao fazer login';
        console.error('Erro ao fazer login:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const getPerfisApi = async (token: string): Promise<UserCardProps[] | undefined | string> => {
    try {
        const response = await axiosInstance.get<UserCardProps[]>(`/perfil/listarTodos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar perfis:", error.response.data.erros);
        return error.response.data.erros[0];
    }
};
export const getPerfilApi = async (id: string): Promise<UserCardProps | undefined | string> => {
    try {
        const response = await axiosInstance.get<UserCardProps>(`/perfil/${id}`, {
        });
        return response.data;
    } catch (error) {
        return error.response.data.erros[0];
    }
};


export const deletePerfilApi = async (id: number, token: string) => {
    try {
        await axiosInstance.delete(`/perfil/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error: any) {
        return error?.response?.data?.titulo || 'Erro ao deletar perfil.';
    }
};

export const PutPerfilApi = async (perfilData: UserCardProps, token: string) => {
    const {
        id,
        email,
        nomeCompleto,
        nomeSocial,
        dataNascimento,
        foto,
        telefone,
        redesSociais,
    } = perfilData;

    try {
        const response = await axiosInstance.put(`/perfil/atualizar/${id}`,
            {
                id,
                email,
                nomeCompleto,
                nomeSocial,
                dataNascimento,
                foto,
                telefone,
                redesSociais: {
                    "linkedin": redesSociais?.linkedin,
                    "github":redesSociais?.github,
                    "instagram":redesSociais?.instagram,
                    "facebook":redesSociais?.facebook,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    } catch (error: any) {
        return error?.response?.data?.titulo || 'Erro ao alterar perfil.';
    }
} 

export const postPerfilApi = async (perfilData: Partial<UserCardProps>, token: string) => {
    const {
        email,
        nomeCompleto,
        nomeSocial,
        dataNascimento,
        foto,
        telefone,
        redesSociais,
    } = perfilData;
    try {
        const response = await axiosInstance.post(`/perfil`,
            {
                email,
                nomeCompleto,
                nomeSocial,
                dataNascimento,
                foto,
                telefone,
                redesSociais: {
                    "linkedin": redesSociais?.linkedin,
                    "github":redesSociais?.github,
                    "instagram": redesSociais?.instagram,
                    "facebook":redesSociais?.facebook,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    } catch (error) {
        return JSON.stringify(error?.response?.data?.titulo);
    }
} 
