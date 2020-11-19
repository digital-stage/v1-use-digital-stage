import useDigitalStage from "../..";
import Link from "next/link";
import {styled} from "styletron-react";
import React from "react";

const Container = styled("div", {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    marginBottom: '1rem'
});
const List = styled("div", {
    display: "flex",
    paddingLeft: "1rem",
    paddingRight: "1rem"
});
const ListItem = styled("div", {
    padding: "1rem",
});

const AppBar = () => {
    const {ready, auth} = useDigitalStage();

    if( ready && auth.user ) {
        return (
            <Container>
                <List>
                    <ListItem>
                        <Link href="/">
                            Home
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/devices">
                            Devices
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/stages">
                            Stages
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/groups">
                            Groups
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/stagemembers">
                            Stage members
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/state">
                            Full state
                        </Link>
                    </ListItem>
                </List>
            </Container>
        )
    }

    return (
        <div>
            Loading app bar...
        </div>
    )
}
export default AppBar;
