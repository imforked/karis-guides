"use client";

import styled from "styled-components";

const PreviewMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1rem 2rem;
  background: ${({ theme }) => theme.color.background};
`;

const TopBar = styled.header`
  padding: 0.75rem 1rem;
  margin: -1.25rem -1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
`;

const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  margin-top: 0.35rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.45;
`;

const Card = styled.section`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: 0 1px 2px ${({ theme }) => theme.color.shadow};
`;

const CardTitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardBody = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textMuted};
`;

const EdgeHint = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.75rem;
  text-align: center;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.4;
`;

export function HomePreview() {
  return (
    <PreviewMain>
      <TopBar>
        <Title>Kari&apos;s Guides</Title>
        <Subtitle>
          Narrow column on a wide window = max-width shell is working. Side
          margins are the page background.
        </Subtitle>
      </TopBar>

      <Card>
        <CardTitle>Sample guide block</CardTitle>
        <CardBody>
          Placeholder copy so you can scroll and confirm the content stays
          inside the centered phone-width column on desktop.
        </CardBody>
      </Card>

      <Card>
        <CardTitle>Another block</CardTitle>
        <CardBody>
          If these cards align with the header above and don&apos;t stretch
          past ~430px on a large monitor, the layout is behaving as intended.
        </CardBody>
      </Card>

      <EdgeHint>
        Tip: widen the browser — you should see empty gutters left and right.
      </EdgeHint>
    </PreviewMain>
  );
}
