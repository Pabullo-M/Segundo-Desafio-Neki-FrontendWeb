import { UserCardProps } from "@/@types";
import { getPerfilApi } from "@/api";
import { Header } from "@/components/Header/Header";
import { PerfilCard } from "@/components/PerfilCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Card() {
    const { id } = useParams()
    const [data, setData] = useState<UserCardProps | undefined | string>();
    useEffect(() => {
        if (id) {
            fetchData();
        }

    }, []);

    const fetchData = async () => {
        if (id) {
            try {
                const profileData = await getPerfilApi(id);
                setData(profileData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    };

    return (
        <>

            <Header />
            {data && typeof data === "string" ? <p>{data}</p> : <PerfilCard {...data!} />}
        </>
    )
}