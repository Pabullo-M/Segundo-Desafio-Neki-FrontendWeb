import React from 'react';
import { CardContainer, DivButton, SocialLinks, UserId, UserInfo, UserName, UserPhoto } from './index.styles';
import { Button } from '../ui/button';
import { PutCardModal } from '../PutCardModal';
import { UserCardProps } from '@/@types';

export const PerfilCard: React.FC<UserCardProps> = (perfilData) => {
    const {
        id,
        email,
        nomeCompleto,
        nomeSocial,
        dataNascimento,
        foto,
        telefone,
        redesSociais,
        onClickDelete,
        setRenderScreen,
        token
    } = perfilData;

    const formatarData = (data?: string) => {
        if (data) {
            const partes = data.split("-");
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return ''
    };

    return (
        <CardContainer>
            <UserPhoto src={foto} alt={nomeCompleto} />
            <UserName>{nomeSocial || nomeCompleto}</UserName>
            <UserId>ID: {id}</UserId>
            <UserInfo>Email: {email}</UserInfo>
            <UserInfo>Data de Nascimento: {formatarData(dataNascimento)}</UserInfo>
            <UserInfo>Telefone: {telefone}</UserInfo>
            <SocialLinks>
                {redesSociais?.linkedin && <a href={redesSociais.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                {redesSociais?.github && <a href={redesSociais.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                {redesSociais?.instagram && <a href={redesSociais.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                {redesSociais?.facebook && <a href={redesSociais.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
            </SocialLinks>
            {token &&
                <DivButton>
                    <PutCardModal {...perfilData}
                        token={token}
                        setRenderScreen={setRenderScreen}
                    />
                    <Button
                        onClick={onClickDelete}
                    >Deletar</Button>
                </DivButton>
            }
        </CardContainer>
    );
};


