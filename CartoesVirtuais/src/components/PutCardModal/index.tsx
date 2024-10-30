import { ModalProps, UserCardProps } from "@/@types"
import { PutPerfilApi } from "@/api"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Modal } from "../Modal"
import { z } from 'zod';

export function PutCardModal({ id, email, nomeCompleto, nomeSocial, dataNascimento, foto, telefone, redesSociais, setRenderScreen, token }: UserCardProps & { setRenderScreen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [renderScreen, setLocalRenderScreen] = useState<boolean>(false);

    const [perfilAlterado, setperfilAlterado] = useState<Partial<UserCardProps>>({
        id,
        email,
        nomeCompleto,
        nomeSocial,
        dataNascimento,
        telefone,
        foto,
        redesSociais,
    });

    const [isModalOpen, setIsModalOpen] = useState<ModalProps>({
        isOpen: false,
        title: "",
        description: "",
    });;

    const allowedDomains = ['neki.com.br', 'neki-it.com.br'];


    const isValidDomain = (email: string) => {
        const domain = email.split('@')[1]; 
        return allowedDomains.includes(domain);
    };

    const perfilSchema = z.object({
        nomeCompleto: z.string().min(1, { message: "Nome Completo é obrigatório." }),
        email: z.string()
        .email({ message: "Email inválido." })
        .transform((email) => email.toLowerCase())
        .refine(isValidDomain, { message: "E-mail deve ser de um domínio permitido (neki.com.br ou neki-it.com.br)." }),
        foto: z.string().min(1, { message: "URL da Foto é obrigatória." }),
        dataNascimento: z.string().min(1, { message: "Data de Nascimento é obrigatória." })
       
    });
    const handlePutPerfil = async () => {
        try {
            
            perfilSchema.parse(perfilAlterado); 
            
            const response = await PutPerfilApi(perfilAlterado, token!);
            console.log(typeof response);
            
            if (typeof response === "string") {
                setIsModalOpen({
                    isOpen: true,
                    title: "Erro",
                    description: response
                });
                return;
            }
            
            setIsModalOpen({
                isOpen: true,
                title: "Sucesso!",
                description: "Alteração realizada com sucesso!"
            });
    
            setLocalRenderScreen(false);
            setRenderScreen((prev) => !prev);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors = error.errors.map((err) => err.message).join(", ");
                setIsModalOpen({
                    isOpen: true,
                    title: "Erro de Validação",
                    description: formattedErrors 
                });
            } else {
                console.error("Erro ao alterar o perfil:", error);
            }
        }
    };
    
    const handleCloseModal = () => setIsModalOpen((prev) => ({ ...prev, isOpen: false }));
    
    return (
        <Dialog open={renderScreen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setLocalRenderScreen(true)}
                >Editar</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                        Faça alterações no seu perfil aqui. Clique em salvar quando terminar,
                        ou em calcelar para cancelar alterações.
                        <br />
                        Os campors com * são obrigatórios.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nome" className="text-right">
                            *Nome Completo
                        </Label>
                        <Input
                            id="nome"
                            defaultValue={nomeCompleto}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    nomeCompleto: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nomeSocial" className="text-right">
                            Nome Social
                        </Label>
                        <Input
                            id="nomeSocial"
                            defaultValue={nomeSocial}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    nomeSocial: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            *E-Mail
                        </Label>
                        <Input
                            id="email"
                            defaultValue={email}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="foto" className="text-right">
                            *Foto (URL)
                        </Label>
                        <Input
                            id="foto"
                            defaultValue={foto}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    foto: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dataNascimento" className="text-right">
                            *Data de Nascimento
                        </Label>
                        <Input
                            id="dataNascimento"
                            defaultValue={dataNascimento}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    dataNascimento: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefone" className="text-right">
                            Telefone
                        </Label>
                        <Input
                            id="telefone"
                            defaultValue={telefone}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    telefone: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="linkedin" className="text-right">
                            LinkedIn
                        </Label>
                        <Input
                            id="linkedin"
                            defaultValue={redesSociais?.linkedin}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    redesSociais: {
                                        ...prev?.redesSociais,
                                        linkedin: e.target.value,
                                    },
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="github" className="text-right">
                            GitHub
                        </Label>
                        <Input
                            id="github"
                            defaultValue={redesSociais?.github}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    redesSociais: {
                                        ...prev?.redesSociais,
                                        github: e.target.value,
                                    },
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="instagram" className="text-right">
                            Instagram
                        </Label>
                        <Input
                            id="instagram"
                            defaultValue={redesSociais?.instagram}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    redesSociais: {
                                        ...prev?.redesSociais,
                                        instagram: e.target.value,
                                    },
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="facebook" className="text-right">
                            Facebook
                        </Label>
                        <Input
                            id="facebook"
                            defaultValue={redesSociais?.facebook}
                            className="col-span-3"
                            onChange={(e) =>
                                setperfilAlterado((prev) => ({
                                    ...prev,
                                    redesSociais: {
                                        ...prev?.redesSociais,
                                        facebook: e.target.value,
                                    },
                                }))
                            }
                        />
                    </div>
                </div>
                <DialogFooter >
                    <Button type="submit"
                        onClick={() => { setLocalRenderScreen(false) }}
                    >
                        Calcelar</Button>
                    <Button type="submit"

                        onClick={() => handlePutPerfil()}
                    >
                        Salvar</Button>
                </DialogFooter>
            </DialogContent>
            <Modal {...isModalOpen} onClick={handleCloseModal} />
        </Dialog>
    )
}
