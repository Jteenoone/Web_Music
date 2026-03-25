export function Item(props) {
    return (
        <div className="flex items-center justify-start">
            <img src={props.srcImg} alt="" className="w-[50px] aspect-square object-cover"/>
            <div>
                <p>{props.nameSong}</p>
                <p>{props.nameSinger}</p>
            </div>
        </div>
    );
}
