import { z } from "zod";

const allowedDomains = ['neki.com.br', 'neki-it.com.br'];


const isValidDomain = (email: string) => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
};

const telefoneRegex = /^\d{2}\s?\d{4,5}-?\d{4}$/;

 export const PerfilSchema = z.object({
    nomeCompleto: z.string().min(1, { message: "Nome Completo é obrigatório." }),
    email: z.string()
        .email({ message: "Email inválido." })
        .transform((email) => email.toLowerCase())
        .refine(isValidDomain, { message: "E-mail deve ser de um domínio permitido (neki.com.br ou neki-it.com.br)." }),
    foto: z.string().min(1, { message: "URL da Foto é obrigatória." }),
    dataNascimento: z.string()
        .transform((dateStr) => {
            const [day, month, year] = dateStr.split("/");
            const date = new Date(`${year}-${month}-${day}`);
            if (isNaN(date.getTime())) {
                throw new Error("Data inválida");
            }

            return date;
        }),
        telefone: z.string()
        .regex(telefoneRegex, {
            message: "Telefone inválido. Exemplo: 22 91234-5678 ou 22 1234-5678"
        })

});