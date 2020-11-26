import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useAuth from "../lib/useAuth";

const Index = () => {
    const auth = useAuth();
    const {push} = useRouter();

    useEffect(() => {
        if( !auth.loading && !auth.user ) {
            push("/auth/signup")
        }
    }, [push, auth])

    return (
        <div>
            Loading

        </div>
    )
}
export default Index;
