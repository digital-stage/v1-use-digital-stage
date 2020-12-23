import {styled} from "styletron-react";
import StageMember from "./StageMember";
import React from "react";
import {Group, useStageMembersByGroup} from "use-digital-stage";
import {colors} from "../ui/Theme";
import {Property} from "csstype";
import useColors from "../../lib/useColors";

const GroupMember = styled("div", {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
});
const GroupWrapper = styled("div", {
    color: colors.text.default,
    backgroundColor: colors.background.dark,
    borderStyle: 'solid',
    borderColor: colors.background.darker,
    borderWidth: '2px',
});
const GroupTitle = styled("h2", (props: {
    $color: Property.BackgroundColor
}) => ({
    color: colors.text.inverted,
    margin: 0,
    backgroundColor: props.$color,
    width: '100%'
}));
const GroupGrid = (props: {
    group: Group;
    filterOffline?: boolean;
}) => {
    const {group, filterOffline} = props;
    let stageMembers = useStageMembersByGroup(group._id);
    const hueColor = useColors(group._id);
    const color = hueColor?.toProperty();

    if (filterOffline) {
        stageMembers = stageMembers.filter(stageMember => stageMember.online);
    }

    return (
        <GroupWrapper>
            <GroupTitle $color={color}>{group.name}</GroupTitle>
            <GroupMember>
                {stageMembers.map(stageMember => <StageMember key={stageMember._id}
                                                              color={color}
                                                              stageMember={stageMember}/>)}
            </GroupMember>
        </GroupWrapper>
    )
}
export default GroupGrid;
