import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.65rem 1.15rem;
  border: 1px solid transparent;
  border-radius: 10px;
  background: var(--primary);
  color: var(--on-primary);
  font: inherit;
  cursor: pointer;
  text-decoration: none;

  &:hover:not(:disabled) { background: var(--primary-hover); }
  &:disabled { opacity: 0.55; cursor: default; }
`;

export const SecondaryButton = styled(Button)`
  gap: 0.4rem;
  border-color: var(--border);
  background: var(--surface);
  color: var(--ink);

  &:hover:not(:disabled) { background: var(--background); }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
`;
