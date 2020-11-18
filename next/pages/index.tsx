import useDigitalStage from "../..";
import LoginPane from "../components/LoginPane";

const Index = () => {
    const {ready, auth} = useDigitalStage();


    if (ready) {
        return (
            <div>
                READY
            </div>
        )
    }

    if (auth && !auth.user) {
        return (
            <LoginPane/>
        )
    }

    return (<div>
        LOADING
    </div>)
}
export default Index
