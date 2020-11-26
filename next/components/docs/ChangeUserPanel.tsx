import React, {useEffect, useState} from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ChangeUserPanel = (props: {
    userName: string;
    avatarUrl: string;
    onClick(userName: string, avatarUrl?: string): void;
}) => {
    const {userName, onClick, avatarUrl} = props;
    const [currentName, setCurrentName] = useState<string>(userName);
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string>(avatarUrl);

    useEffect(() => {
        setCurrentName(userName);
    }, [userName])

    useEffect(() => {
        setCurrentAvatarUrl(avatarUrl);
    }, [avatarUrl]);

    return (
        <>
            <Input
                type="text"
                placeholder="group name"
                value={currentName}
                onChange={(event) => setCurrentName(event.target.value)}
            />
            <Input
                type="url"
                placeholder="avatar url"
                value={avatarUrl}
                onChange={(event) => setCurrentAvatarUrl(event.target.value)}
            />
            <Button onClick={() => onClick(currentName, currentAvatarUrl)}>Change</Button>
        </>
    );
};
export default ChangeUserPanel;
