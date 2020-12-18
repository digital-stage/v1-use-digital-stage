const Paragraph = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;

    return (
        <p>
            {children}
        </p>
    )
}
export default Paragraph;
