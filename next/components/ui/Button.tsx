import { styled } from 'styletron-react';

const Button = styled('button', {
  border: '1px solid black',
  backgroundColor: '#50fa7b',
  padding: '.2rem',
  color: '#000',
  fontFamily: "'Fira Code', monospace",

  ':hover': {
    backgroundColor: '#40cd64',
  },
  ':disabled': {
    cursor: 'default',
    backgroundColor: '#cd40aa',
  },
});
export default Button;
