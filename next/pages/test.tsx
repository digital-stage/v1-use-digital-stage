import {useAudioConsumers, useStageMembers, useVideoConsumers} from "use-digital-stage";

const Test = () => {
    const videoConsumers = useVideoConsumers();
    const audioConsumers = useAudioConsumers();
    const stageMembers = useStageMembers();

    return (
        <div>
            {videoConsumers.allIds.map(id => videoConsumers.byId[id]).map(consumer => (
                <div key={consumer._id}>
                    {stageMembers.byId[consumer.stageMemberId].name}
                </div>
            ))}
            {audioConsumers.allIds.map(id => audioConsumers.byId[id]).map(consumer => (
                <div key={consumer._id}>
                    {stageMembers.byId[consumer.stageMemberId].name}
                </div>
            ))}
        </div>
    )
}
export default Test;
