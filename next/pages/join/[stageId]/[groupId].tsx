import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Container from "../../../components/ui/Container";
import useStageJoiner from "../../../lib/useStageJoiner";

const Join = () => {
    const {query, push, prefetch} = useRouter();

    const {requestJoin} = useStageJoiner();

    React.useEffect(() => {
        if (prefetch)
            prefetch('/');
    }, [prefetch]);

    useEffect(() => {
        if (query && push) {
            const {stageId, groupId, password} = query;
            if (stageId && groupId && !Array.isArray(stageId) && !Array.isArray(groupId)) {
                if (password && !Array.isArray(password)) {
                    requestJoin(stageId, groupId, password);
                } else {
                    requestJoin(stageId, groupId);
                }
                push('/');
            }
        }

    }, [query, push])

    return (
        <Container>
            Loading...
        </Container>
    );
}
export default Join;
