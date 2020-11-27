import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useAuth from "../lib/useAuth";
import Link from "next/link";
import {styled} from "styletron-react";
import {useCurrentStageId} from "../../dist";
import Container from "../components/ui/Container";

const List = styled("div", {
    display: 'flex',
    flexDirection: 'column'
})
const ListItem = styled("div", {})

const Index = () => {
    const auth = useAuth();
    const {push} = useRouter();
    const stageId = useCurrentStageId();

    useEffect(() => {
        if (!auth.loading && !auth.user) {
            push("/auth/signup")
        }
    }, [push, auth]);

    return (
        <Container>
            <List>
                <ListItem>
                    See <Link href="/docs"><a>documentation</a></Link>
                </ListItem>
                {stageId ? (
                    <ListItem>
                        <Link href="/stage">
                            <a>Go to current stage</a>
                        </Link>
                    </ListItem>
                ) : null}
                <ListItem>
                    <Link href="/stages">
                        <a>Show stages</a>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/auth/logout">
                        <a>Logout</a>
                    </Link>
                </ListItem>
            </List>
        </Container>
    )
}
export default Index;
