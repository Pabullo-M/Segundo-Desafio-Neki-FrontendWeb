import { Header } from "@/components/Header/Header";
import { Card, CardContainer, PostModalDiv, SearchDiv } from "./index.styles";
import { PerfilCard } from "@/components/PerfilCard";
import { useEffect, useState } from "react";
import { deletePerfilApi, getPerfisApi } from "@/api";
import { getFromLocalStorage } from "@/util";
import { useNavigate } from "react-router-dom";
import { ModalProps, UserCardProps } from "@/@types";
import { PostCardModal } from "@/components/PostCardModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Modal } from "@/components/Modal";

export const Home = () => {

    const [perfisData, setperfisData] = useState<UserCardProps[] | undefined>();
    const [searchData, setSearchData] = useState<UserCardProps[] | undefined>();
    const [searchName, setSearchName] = useState<string>();
    const [token, setToken] = useState<string>();
    const [renderScreen, setRenderScreen] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<ModalProps>({
        isOpen: false,
        title: "",
        description: "",
    });;

    const data: UserCardProps[] | undefined = searchData ? searchData : perfisData;

    const navigate = useNavigate();

    useEffect(() => {
        fetchToken();
    }, []);

    useEffect(() => {
        if (token) {
            fetchDataApi();
        }
    }, [token, renderScreen]);

    const fetchToken = async () => {
        const responseLocalStorage = await getFromLocalStorage('tokenUsuario');
        if (responseLocalStorage) {
            return setToken(responseLocalStorage);
        }
        setIsModalOpen({
            isOpen: true,
            title: "Falha no login",
            description: "Favor realizar o login novamente."
        });
        
            setTimeout(() => {
                setIsModalOpen((prevState) => ({ ...prevState, isOpen: false }));
                navigate("/login");
            }, 3000);
     
    }
    const handleCloseModal = ()=> setIsModalOpen((prev) => ({...prev, isOpen: false}));
    const fetchDataApi = async () => {
        try {
            const dataApi = await getPerfisApi(token!);
            if(typeof dataApi === "string"){
                setIsModalOpen({
                    isOpen: true,
                    title: "Erro ao buscar dados:",
                    description: dataApi
                });
                return
            }
            setperfisData(dataApi);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }

    const handleDelete = async (id: number) => {
        const response = await deletePerfilApi(id, token!)
        if(typeof response === "string"){
            setIsModalOpen({
                isOpen: true,
                title: "Erro",
                description: response
            });
        }
        setIsModalOpen({
            isOpen: true,
            title: "Sucesso!",
            description: "Perfil deletado com sucesso!"
        });
        setRenderScreen(!renderScreen);
    }
    const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        setSearchName(name);
        const nameSearched = perfisData?.filter(
            perfil => (perfil.nomeSocial || perfil.nomeCompleto)
                .toLowerCase()
                .includes(name.toLowerCase())
        );

        setSearchData(nameSearched);
    };

    return (
        <>
            <Header />
            <PostModalDiv>
                <PostCardModal
                    setRenderScreen={setRenderScreen}
                    token={token!}
                />
            </PostModalDiv>
            <SearchDiv>
                <Input
                    placeholder="Pesquisar"
                    value={searchName}
                    onChange={handleSearchName}
                />
                <MagnifyingGlassIcon className="absolute top-3 right-2" />
            </SearchDiv>
            {data && Array.isArray(data) && data.length > 0 ? (
                <CardContainer>
                    {data.map((perfilData) => (
                        <Card key={perfilData.id}>
                            <PerfilCard
                                {...perfilData}
                                onClickDelete={() => handleDelete(perfilData.id)}
                                token={token}
                                setRenderScreen={setRenderScreen}
                            />
                        </Card>
                    ))}
                </CardContainer>
            ) : (
                <p>Não foram encontrados Dados.</p>
            )}
            {isModalOpen.isOpen && <Modal onClick={handleCloseModal} {...isModalOpen} />}
        </>
    );
}