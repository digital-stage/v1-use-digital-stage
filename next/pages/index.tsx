import React from 'react';
import useDigitalStage, {useCurrentUser} from '../..';
import LoginPane from '../components/LoginPane';

const Index = () => {
    const {ready, auth, router} = useDigitalStage();
    const currentUser = useCurrentUser();

    if (auth && !auth.user) {
        return <LoginPane/>;
    }


    return (
        <div>
            READY
            <div>
                <h2>Connection information</h2>
                <ul>
                    <li>
                        Status:
                        {ready ? 'ready' : 'loading'}
                    </li>
                    {router ? <li>Fastest Router:{router.url}</li> : null}
                    {currentUser ? <li>
                        Your user ID:{currentUser._id}</li> : null}
                </ul>
            </div>
        </div>
    );
};
export default Index;
