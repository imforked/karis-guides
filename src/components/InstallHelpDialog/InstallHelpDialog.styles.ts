import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1002;
  background: ${({ theme }) => theme.palette.ink};
  opacity: 0.4;
`;

export const Panel = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
  box-sizing: border-box;
  width: min(92vw, 22rem);
  max-height: min(80vh, 28rem);
  overflow: auto;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: 0 12px 40px ${({ theme }) => theme.color.shadow};
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.65rem;
  color: ${({ theme }) => theme.color.foreground};
`;

export const Body = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textMuted};

  ol {
    margin: 0.5rem 0 0 1.1rem;
    padding: 0;
  }

  li {
    margin-bottom: 0.35rem;
  }
`;

export const Hint = styled.p`
  margin-top: 0.5rem;
`;

export const CloseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.85rem;
`;
