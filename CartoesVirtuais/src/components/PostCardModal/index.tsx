import { ModalProps, UserCardProps } from "@/@types"
import { postPerfilApi } from "@/api"
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
import { z } from "zod"
import { PerfilSchema } from "@/util/zodSchema"

interface TokenProps {
    token: string;
    setRenderScreen: React.Dispatch<React.SetStateAction<boolean>>;
}



export function PostCardModal({ token, setRenderScreen }: TokenProps) {
    const [renderScreen, setLocalRenderScreen] = useState<boolean>(false);
    const [perfilCadastro, setPerfilCadastro] = useState<Partial<UserCardProps>>({});
    const [isModalOpen, setIsModalOpen] = useState<ModalProps>({
        isOpen: false,
        title: "",
        description: "",
    });

    const handlePostApi = async () => {
        try {
            PerfilSchema.safeParse(perfilCadastro);
            const response = await postPerfilApi(perfilCadastro!, token)

            if (typeof response === "string") {
                setIsModalOpen({
                    isOpen: true,
                    title: "",
                    description: response
                });
                return
            }
            setIsModalOpen({
                isOpen: true,
                title: "Sucesso ao realizar o cadastro!",
                description: ""
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
    }

    const handleCloseModal = () => {
        setIsModalOpen((prev) => ({ ...prev, isOpen: false }))
    }
    return (
        <Dialog open={renderScreen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setLocalRenderScreen(true)}
                >Criar Perfil</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Criar novo perfil.</DialogTitle>
                    <DialogDescription>
                        Ao terminar clique no botão "Salvar", caso deseje cancelar clique no botão "Cancelar".
                        <br />
                        Os campor com * são obrigatórios!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nome" className="text-right">
                            *Nome Completo
                        </Label>
                        <Input
                            id="nome"
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="foto" className="text-right">
                            *Foto (URL)
                        </Label>
                        <Input
                            id="foto"
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            type="date"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                            className="col-span-3"
                            onChange={(e) =>
                                setPerfilCadastro((prev) => ({
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
                        onClick={() => handlePostApi()}
                    >
                        Salvar</Button>

                </DialogFooter>
            </DialogContent>
            {isModalOpen.isOpen && <Modal {...isModalOpen}
                onClick={handleCloseModal} />}
        </Dialog>
    )
}
