import styled from "styled-components";

export const Panel = styled.div`
  pointer-events: auto;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 901;
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  padding: 0.85rem 1rem;
  padding-bottom: calc(0.85rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: 12px 12px 0 0;
  background: ${({ theme }) => theme.color.surface};
  box-shadow: 0 -4px 24px ${({ theme }) => theme.color.shadow};
`;

export const Title = styled.p`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.foreground};
  margin-bottom: 0.35rem;
`;

export const Body = styled.p`
  font-size: 0.8125rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.color.textMuted};
  margin-bottom: 0.75rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;
