export interface UserCardProps {
    id:number;
    email: string;
    nomeCompleto: string;
    nomeSocial: string;
    dataNascimento: string;
    foto: string;
    telefone: string;
    redesSociais?: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        facebook?: string;
    };
    onClickDelete?:()=>void;
    onClickPut?:()=>void;
    setRenderScreen: React.Dispatch<React.SetStateAction<boolean>>;
    token?:string;
}

export interface ModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    onClick?:()=> void;
  }