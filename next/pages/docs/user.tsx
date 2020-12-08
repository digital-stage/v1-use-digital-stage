import React from "react";
import {useStageActions, useCurrentUser, useUsers} from "use-digital-stage";
import CodeWrapper from "../../components/ui/CodeWrapper";
import ChangeUserPanel from "../../components/docs/ChangeUserPanel";
import DocsWrapper from "../../components/docs/DocsWrapper";

const User = () => {
    const {updateUser} = useStageActions();
    const currentUser = useCurrentUser();
    const users = useUsers();

    return (
        <DocsWrapper>
            <h2>Usage</h2>
            <h3>Fetch</h3>
            <p>
                Get current user by using:
            </p>
            <CodeWrapper>const currentUser = useCurrentUser()</CodeWrapper>
            <h3>Update</h3>
            <p>
                You can update the current user:
            </p>
            <CodeWrapper>
                const &#123; actions &#125; = useDigitalStage()<br/>
                actions.updateUser("Stage name", "my-password")
            </CodeWrapper>
            <h2>Result</h2>
            <h3>All users</h3>
            <CodeWrapper>
                <pre>
                {JSON.stringify(users, null, 2)}
                </pre>
            </CodeWrapper>
            <h3>Current user</h3>
            <CodeWrapper>
                <pre>
                {JSON.stringify(currentUser, null, 2)}
                </pre>
            </CodeWrapper>

            {currentUser ? <ChangeUserPanel userName={currentUser.name} onClick={updateUser}
                                            avatarUrl={currentUser.avatarUrl}/> : undefined}

        </DocsWrapper>
    )
}
export default User;
