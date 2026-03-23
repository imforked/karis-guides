import Link from "next/link";
import styled from "styled-components";

export const Root = styled.li`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: 0 1px 2px ${({ theme }) => theme.color.shadow};
`;

export const Title = styled.h2`
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

export const Summary = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textMuted};
  margin-bottom: 0.65rem;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.65rem;
`;

export const TagChip = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.2;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.textMuted};

  &:hover {
    border-color: ${({ theme }) => theme.palette.earth};
    color: ${({ theme }) => theme.color.foreground};
  }
`;

export const OpenPdf = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.earth};
  text-decoration: underline;
  text-underline-offset: 2px;
`;
