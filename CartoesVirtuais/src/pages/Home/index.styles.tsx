import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  gap: 1rem;
  margin: 5rem;
`;

export const Card = styled.div`
  flex: 0 1 calc(33.33% - 1rem);
  border-radius: 8px;
  padding: 1rem;
`;
export const PostModalDiv = styled.div`
    position: fixed ;
    left: 5rem;
    top:1.5rem;

`
export const SearchDiv = styled.div`
    position: fixed ;
    display: flex ;
    flex-direction: row ;
    right: 1rem;
    top:1.5rem;

`