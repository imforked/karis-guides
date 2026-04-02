import Link from "next/link";
import styled from "styled-components";

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem 2rem;
  background: ${({ theme }) => theme.color.background};
`;

export const PageIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.textMuted};
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.color.foreground};
  }
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.45;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Item = styled.li`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: 0 1px 2px ${({ theme }) => theme.color.shadow};
`;

export const ItemTitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const OpenedAt = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.textMuted};
  margin-bottom: 0.65rem;
  line-height: 1.45;
`;

export const OpenPdfButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.earth};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${({ theme }) => theme.color.foreground};
  }
`;

export const EmptyState = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.5;
`;
