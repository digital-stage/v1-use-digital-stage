import React, {useRef} from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AddCustomStageMember = (props: {

    onClick(stageName: string): void
}) => {
  const groupNameRef = useRef<HTMLInputElement>();

  return (
    <>
      <Input type="text" placeholder="group name" ref={groupNameRef} />
      <Button onClick={() => props.onClick(groupNameRef.current.value)}>
        Add
      </Button>
    </>
  );
};
export default AddCustomStageMember;
