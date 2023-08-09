export function Newsfeed() {
    return (
        <div className={' tw-overflow-scroll '}>
            {Array.from({ length: 100 }).map((_, i) => (
                <div key={i}>Newsfeed {i}</div>
            ))}
            {/*newsfeed*/}
        </div>
    );
}
