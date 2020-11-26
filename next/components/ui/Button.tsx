import {styled} from 'styletron-react';

const Button = styled('button', {
  border: '1px solid black',
  backgroundColor: '#000',
  padding: '.2rem',
  color: '#fff',
  fontFamily: "'Fira Code', monospace",

  ':hover': {
    backgroundColor: '#333',
  },
  ':disabled': {
    cursor: 'default',
    backgroundColor: '#fff',
  },
});
export default Button;
