import styled from 'styled-components';

export const CardContainer = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

export const UserPhoto = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-bottom: 16px;
`;

export const UserName = styled.h3`
    font-size: 18px;
    margin: 8px 0;
`;
export const UserId = styled.p`
    font-size: 14px;
    color: #555;
    margin: 4px 0;
`;

export const UserInfo = styled.p`
    font-size: 14px;
    color: #555;
    margin: 4px 0;
`;

export const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;

    a {
        text-decoration: none;
        color: #0073e6;
    }
`;

export const DivButton = styled.div`
    margin-top: 1rem ;
    width: 100% ;
    display: flex ;
    flex-direction: row ;
    justify-content: space-around ;
` 